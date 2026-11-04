import os
import math
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont

PICS_DIR = "/home/ayushcod3r/projects/ayush/ayush_landing_pics"
CUTOUT_PATH = os.path.join(PICS_DIR, "landing_image_1_proper_cut.png")
TEACHING_PATH = os.path.join(PICS_DIR, "updated_teaching_my_landing_second_image.png")
P01_PATH = os.path.join(PICS_DIR, "ayush_portfolio_01_final.jpg")
P03_PATH = os.path.join(PICS_DIR, "ayush_portfolio_03_final.jpg")
P04_PATH = os.path.join(PICS_DIR, "ayush_portfolio_04_final.jpg")

OUT_DESKTOP = "/home/ayushcod3r/projects/ayush/public/hero_collage_desktop.webp"
OUT_MOBILE = "/home/ayushcod3r/projects/ayush/public/hero_visual_mobile.webp"

MONO_FONT_PATH = "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf"

def get_font(size: int):
    try:
        return ImageFont.truetype(MONO_FONT_PATH, size)
    except Exception:
        return ImageFont.load_default()

def grade_image(img: Image.Image, contrast=1.12, saturation=1.02, cool_tint=True) -> Image.Image:
    """Grades conference photos to fit the dark cyberpunk/open-source developer theme."""
    is_rgba = img.mode == "RGBA"
    orig_alpha = img.split()[-1] if is_rgba else None

    img_rgb = img.convert("RGB")
    enh_c = ImageEnhance.Contrast(img_rgb)
    img_c = enh_c.enhance(contrast)
    enh_s = ImageEnhance.Color(img_c)
    img_s = enh_s.enhance(saturation)

    if cool_tint:
        arr = np.array(img_s, dtype=np.float32)
        arr[:, :, 0] *= 0.98  # Red
        arr[:, :, 1] *= 1.00  # Green
        arr[:, :, 2] *= 1.02  # Blue
        img_s = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

    res = img_s.convert("RGBA")
    if orig_alpha:
        res.putalpha(orig_alpha)
    return res

def crop_and_fit(img: Image.Image, target_w: int, target_h: int, focus_x: float = 0.5, focus_y: float = 0.5) -> Image.Image:
    img_w, img_h = img.size
    target_aspect = target_w / target_h
    img_aspect = img_w / img_h

    if img_aspect > target_aspect:
        new_w = int(img_h * target_aspect)
        offset_x = int((img_w - new_w) * focus_x)
        crop_box = (offset_x, 0, offset_x + new_w, img_h)
    else:
        new_h = int(img_w / target_aspect)
        offset_y = int((img_h - new_h) * focus_y)
        crop_box = (0, offset_y, img_w, offset_y + new_h)

    cropped = img.crop(crop_box)
    return cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

def create_glass_card(
    img: Image.Image,
    target_w: int,
    target_h: int,
    radius: int = 24,
    border_color = (255, 255, 255, 65),
    border_width: int = 2,
    glow_color = None,
    glow_radius: int = 0,
    badge_label: str = "",
    badge_accent = (216, 255, 88),
    focus_x: float = 0.5,
    focus_y: float = 0.5
) -> Image.Image:
    graded = grade_image(img)
    card_img = crop_and_fit(graded, target_w, target_h, focus_x, focus_y).convert("RGBA")

    # Mask with rounded corners
    mask = Image.new("L", (target_w, target_h), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.rounded_rectangle([0, 0, target_w - 1, target_h - 1], radius=radius, fill=255)

    card = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    card.paste(card_img, (0, 0), mask=mask)

    # Subtle bottom vignette inside mask
    vignette = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette)
    v_start = int(target_h * 0.70)
    for y in range(v_start, target_h):
        prog = (y - v_start) / (target_h - v_start)
        alpha_val = int(prog * 115)
        vdraw.line([(0, y), (target_w, y)], fill=(5, 6, 8, alpha_val))
    
    v_arr = np.array(vignette)
    m_arr = np.array(mask)
    v_arr[:, :, 3] = (v_arr[:, :, 3].astype(np.float32) * (m_arr.astype(np.float32) / 255.0)).astype(np.uint8)
    card.alpha_composite(Image.fromarray(v_arr, "RGBA"))

    # Specular top edge sheen
    sdraw = ImageDraw.Draw(card)
    sdraw.line([(radius, 1), (target_w - radius, 1)], fill=(255, 255, 255, 110), width=1)

    # Glass tag / badge inside card
    if badge_label:
        badge_canvas = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
        bdraw = ImageDraw.Draw(badge_canvas)
        
        font_size = 11 if target_w >= 450 else 9
        font = get_font(font_size)
        
        bx, by = 14, target_h - 32
        bw = int(len(badge_label) * (font_size * 0.65) + 36)
        bh = 22
        
        bdraw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=11, fill=(10, 12, 16, 215), outline=(255, 255, 255, 45), width=1)
        dot_y = by + (bh // 2)
        bdraw.ellipse([bx + 7, dot_y - 3, bx + 13, dot_y + 3], fill=(*badge_accent, 255))
        bdraw.text((bx + 18, by + 4), badge_label, font=font, fill=(240, 240, 233, 240))
        
        card.alpha_composite(badge_canvas)

    # Crisp border
    bdraw = ImageDraw.Draw(card)
    bdraw.rounded_rectangle(
        [border_width // 2, border_width // 2, target_w - 1 - border_width // 2, target_h - 1 - border_width // 2],
        radius=radius,
        outline=border_color,
        width=border_width
    )

    if glow_color and glow_radius > 0:
        pad = glow_radius * 2
        glow_canvas = Image.new("RGBA", (target_w + pad * 2, target_h + pad * 2), (0, 0, 0, 0))
        glow_layer = Image.new("RGBA", (target_w + pad * 2, target_h + pad * 2), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glow_layer)
        gdraw.rounded_rectangle(
            [pad, pad, pad + target_w - 1, pad + target_h - 1],
            radius=radius,
            outline=glow_color,
            width=border_width * 2
        )
        glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(glow_radius))
        glow_canvas.alpha_composite(glow_layer)
        glow_canvas.alpha_composite(card, (pad, pad))
        return glow_canvas

    return card

def add_drop_shadow(img: Image.Image, offset=(0, 16), blur_radius=20, shadow_alpha=180, padding=50) -> Image.Image:
    w, h = img.size
    canvas_w, canvas_h = w + padding * 2, h + padding * 2
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    alpha = img.split()[-1]
    shadow_mask = Image.new("L", (canvas_w, canvas_h), 0)
    sx = padding + offset[0]
    sy = padding + offset[1]
    shadow_mask.paste(alpha, (sx, sy))

    blurred_mask = shadow_mask.filter(ImageFilter.GaussianBlur(blur_radius))
    shadow_layer = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, shadow_alpha))
    shadow_layer.putalpha(blurred_mask)

    canvas.alpha_composite(shadow_layer)
    canvas.alpha_composite(img, (padding, padding))
    return canvas

def rotate_card(img: Image.Image, angle: float) -> Image.Image:
    return img.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)

def process_hero_cutout(cutout: Image.Image) -> Image.Image:
    """Grades hero cutout with transparency fully preserved, adds neon rim-light along silhouette edges, and dissolves bottom into dark background."""
    w, h = cutout.size
    orig_alpha = cutout.split()[-1]

    # Color grading while strictly preserving alpha
    cutout_rgb = cutout.convert("RGB")
    enh_c = ImageEnhance.Contrast(cutout_rgb)
    c = enh_c.enhance(1.10)
    enh_s = ImageEnhance.Color(c)
    s = enh_s.enhance(1.02)
    graded = s.convert("RGBA")
    graded.putalpha(orig_alpha)

    arr = np.array(graded)
    alpha = arr[:, :, 3]

    # Edge contour for neon lime rim light
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    alpha_dilated = cv2.dilate(alpha, kernel, iterations=1)
    alpha_eroded = cv2.erode(alpha, kernel, iterations=1)
    edge_mask = ((alpha_dilated > 0) & (alpha_eroded == 0)).astype(np.float32)

    xx, yy = np.meshgrid(np.linspace(0, 1, w), np.linspace(0, 1, h))
    dir_weight = np.clip(xx * 0.75 + (1.0 - yy) * 0.25, 0, 1) ** 1.3

    rim_alpha = (edge_mask * dir_weight * (alpha / 255.0) * 135).astype(np.uint8)
    rim_blur = cv2.GaussianBlur(rim_alpha, (5, 5), 1.5)

    rim_layer = np.zeros((h, w, 4), dtype=np.uint8)
    rim_layer[:, :, 0] = 216  # R
    rim_layer[:, :, 1] = 255  # G
    rim_layer[:, :, 2] = 88   # B
    rim_layer[:, :, 3] = rim_blur
    rim_pil = Image.fromarray(rim_layer, mode="RGBA")
    graded = Image.alpha_composite(graded, rim_pil)

    # Smooth vertical gradient fade at bottom (dissolve lower 14% into background)
    r, g, b, a = graded.split()
    a_arr = np.array(a, dtype=np.float32)
    fade_start = int(h * 0.86)
    fade_len = h - fade_start
    fade_curve = np.linspace(1.0, 0.0, fade_len) ** 1.2
    a_arr[fade_start:, :] *= fade_curve[:, np.newaxis]

    a_faded = Image.fromarray(np.clip(a_arr, 0, 255).astype(np.uint8))
    graded.putalpha(a_faded)
    return graded

def draw_tux_badge(w=200, h=95, radius=22) -> Image.Image:
    badge = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    bg_mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(bg_mask).rounded_rectangle([0, 0, w - 1, h - 1], radius=radius, fill=255)

    glass_bg = Image.new("RGBA", (w, h), (14, 16, 20, 235))
    badge.paste(glass_bg, (0, 0), mask=bg_mask)

    sdraw = ImageDraw.Draw(badge)
    sdraw.line([(radius, 1), (w - radius, 1)], fill=(255, 255, 255, 90), width=1)
    sdraw.rounded_rectangle([1, 1, w - 2, h - 2], radius=radius, outline=(216, 255, 88, 220), width=2)

    cx, cy = 42, h // 2
    sdraw.ellipse([cx - 20, cy - 28, cx + 20, cy + 28], fill=(255, 255, 255, 245))
    sdraw.ellipse([cx - 13, cy - 8, cx + 13, cy + 24], fill=(15, 17, 20, 245))
    sdraw.ellipse([cx - 7, cy - 18, cx - 3, cy - 11], fill=(15, 17, 20, 245))
    sdraw.ellipse([cx + 3, cy - 18, cx + 7, cy - 11], fill=(15, 17, 20, 245))
    sdraw.polygon([(cx - 6, cy - 11), (cx + 6, cy - 11), (cx, cy - 4)], fill=(216, 255, 88, 255))
    sdraw.ellipse([cx - 18, cy + 20, cx - 2, cy + 28], fill=(216, 255, 88, 255))
    sdraw.ellipse([cx + 2, cy + 20, cx + 18, cy + 28], fill=(216, 255, 88, 255))

    font = get_font(10)
    px, py = cx + 32, cy - 14
    pw, ph = 110, 28
    sdraw.rounded_rectangle([px, py, px + pw, py + ph], radius=7, fill=(22, 25, 32, 210), outline=(255, 255, 255, 30), width=1)
    sdraw.ellipse([px + 7, cy - 3, px + 13, cy + 3], fill=(216, 255, 88, 255))
    sdraw.text((px + 18, py + 7), "LINUX UPSTREAM", font=font, fill=(240, 240, 233, 235))

    return badge

def draw_neon_curve(canvas_w, canvas_h, pts) -> Image.Image:
    layer = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    smooth_pts = []
    for i in range(len(pts) - 1):
        p0 = pts[max(0, i - 1)]
        p1 = pts[i]
        p2 = pts[i + 1]
        p3 = pts[min(len(pts) - 1, i + 2)]
        for t in np.linspace(0, 1, 45, endpoint=False):
            t2 = t * t
            t3 = t2 * t
            x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3)
            y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
            smooth_pts.append((x, y))
    smooth_pts.append(pts[-1])

    # Outer glow
    p1_img = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    p1_draw = ImageDraw.Draw(p1_img)
    for i in range(len(smooth_pts) - 1):
        p1_draw.line([smooth_pts[i], smooth_pts[i + 1]], fill=(216, 255, 88, 55), width=42)
    p1_img = p1_img.filter(ImageFilter.GaussianBlur(16))
    layer.alpha_composite(p1_img)

    # Mid glow
    p2_img = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    p2_draw = ImageDraw.Draw(p2_img)
    for i in range(len(smooth_pts) - 1):
        p2_draw.line([smooth_pts[i], smooth_pts[i + 1]], fill=(216, 255, 88, 200), width=15)
    p2_img = p2_img.filter(ImageFilter.GaussianBlur(5))
    layer.alpha_composite(p2_img)

    # Core line
    p3_draw = ImageDraw.Draw(layer)
    for i in range(len(smooth_pts) - 1):
        p3_draw.line([smooth_pts[i], smooth_pts[i + 1]], fill=(248, 255, 220, 255), width=4)

    return layer

def build_desktop_collage():
    print("Building Theme-Linked Desktop Collage (1300x1140)...")
    canvas_w, canvas_h = 1300, 1140
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    glow_layer = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow_layer)
    gdraw.ellipse([350, 130, 950, 730], fill=(216, 255, 88, 45))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(110))
    canvas.alpha_composite(glow_layer)

    cutout_raw = Image.open(CUTOUT_PATH).convert("RGBA")
    teaching_raw = Image.open(TEACHING_PATH).convert("RGBA")
    p01_raw = Image.open(P01_PATH).convert("RGBA")
    p03_raw = Image.open(P03_PATH).convert("RGBA")
    p04_raw = Image.open(P04_PATH).convert("RGBA")

    # Top-Left Card: Podium Presentation (p01)
    card_tl = create_glass_card(
        p01_raw, 520, 380, radius=24,
        border_color=(255, 255, 255, 65), border_width=2,
        badge_label="STAGE & KEYNOTE", badge_accent=(255, 255, 255),
        focus_x=0.5, focus_y=0.25
    )
    card_tl = add_drop_shadow(card_tl, offset=(-10, 18), blur_radius=22, shadow_alpha=180, padding=50)
    card_tl = rotate_card(card_tl, -7.0)
    canvas.alpha_composite(card_tl, (0, 20))

    # Top-Right Card: OpenPrinting Screen Teaching (teaching)
    card_tr = create_glass_card(
        teaching_raw, 640, 440, radius=26,
        border_color=(216, 255, 88, 190), border_width=2,
        glow_color=(216, 255, 88, 90), glow_radius=14,
        badge_label="OPENPRINTING / ARCH", badge_accent=(216, 255, 88),
        focus_x=0.45, focus_y=0.4
    )
    card_tr = add_drop_shadow(card_tr, offset=(12, 20), blur_radius=24, shadow_alpha=200, padding=50)
    card_tr = rotate_card(card_tr, 6.0)
    canvas.alpha_composite(card_tr, (560, 10))

    # Bottom-Left Card: Discussion / Networking (p04)
    card_bl = create_glass_card(
        p04_raw, 500, 360, radius=24,
        border_color=(255, 255, 255, 60), border_width=2,
        badge_label="UPSTREAM COLLAB", badge_accent=(255, 255, 255),
        focus_x=0.5, focus_y=0.35
    )
    card_bl = add_drop_shadow(card_bl, offset=(-8, 18), blur_radius=20, shadow_alpha=180, padding=50)
    card_bl = rotate_card(card_bl, -5.0)
    canvas.alpha_composite(card_bl, (20, 480))

    # Bottom-Right Card: Stage gestures (p03)
    card_br = create_glass_card(
        p03_raw, 510, 360, radius=24,
        border_color=(255, 255, 255, 60), border_width=2,
        badge_label="TECH TALKS & PANELS", badge_accent=(255, 255, 255),
        focus_x=0.5, focus_y=0.25
    )
    card_br = add_drop_shadow(card_br, offset=(10, 18), blur_radius=20, shadow_alpha=180, padding=50)
    card_br = rotate_card(card_br, 4.5)
    canvas.alpha_composite(card_br, (660, 480))

    # Main Hero Portrait: Ayush cutout (TRANSPARENCY FULLY PRESERVED)
    cutout_processed = process_hero_cutout(cutout_raw)
    cw, ch = cutout_processed.size
    target_cw = 920
    target_ch = int(ch * (target_cw / cw))
    cutout_scaled = cutout_processed.resize((target_cw, target_ch), Image.Resampling.LANCZOS)
    
    cutout_with_shadow = add_drop_shadow(cutout_scaled, offset=(0, 20), blur_radius=26, shadow_alpha=210, padding=60)
    cutout_x = (canvas_w - (target_cw + 120)) // 2 + 10
    cutout_y = 90
    canvas.alpha_composite(cutout_with_shadow, (cutout_x, cutout_y))

    # Tux Glass Badge
    tux_badge = draw_tux_badge(w=210, h=95, radius=22)
    tux_badge = add_drop_shadow(tux_badge, offset=(6, 14), blur_radius=18, shadow_alpha=220, padding=35)
    tux_badge = rotate_card(tux_badge, -2.0)
    canvas.alpha_composite(tux_badge, (860, 770))

    # Neon Ribbon
    pts = [
        (220, 780),
        (380, 880),
        (620, 910),
        (850, 850),
        (1030, 790),
        (1140, 750)
    ]
    ribbon = draw_neon_curve(canvas_w, canvas_h, pts)
    canvas.alpha_composite(ribbon, (0, 0))

    canvas.save(OUT_DESKTOP, "WEBP", quality=95, method=6)
    print(f"Saved Desktop Collage to {OUT_DESKTOP}")

def build_mobile_collage():
    print("Building Theme-Linked Mobile Collage (940x780)...")
    canvas_w, canvas_h = 940, 780
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    glow_layer = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow_layer)
    gdraw.ellipse([220, 70, 720, 570], fill=(216, 255, 88, 42))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(80))
    canvas.alpha_composite(glow_layer)

    cutout_raw = Image.open(CUTOUT_PATH).convert("RGBA")
    teaching_raw = Image.open(TEACHING_PATH).convert("RGBA")
    p01_raw = Image.open(P01_PATH).convert("RGBA")
    p03_raw = Image.open(P03_PATH).convert("RGBA")
    p04_raw = Image.open(P04_PATH).convert("RGBA")

    # Top-Left Card: Podium (p01)
    card_tl = create_glass_card(
        p01_raw, 380, 270, radius=22,
        border_color=(255, 255, 255, 65), border_width=2,
        badge_label="STAGE", badge_accent=(255, 255, 255),
        focus_x=0.5, focus_y=0.25
    )
    card_tl = add_drop_shadow(card_tl, offset=(-6, 14), blur_radius=18, shadow_alpha=180, padding=40)
    card_tl = rotate_card(card_tl, -7.0)
    canvas.alpha_composite(card_tl, (0, 10))

    # Top-Right Card: Screen Teaching (teaching)
    card_tr = create_glass_card(
        teaching_raw, 460, 310, radius=24,
        border_color=(216, 255, 88, 190), border_width=2,
        glow_color=(216, 255, 88, 90), glow_radius=12,
        badge_label="OPENPRINTING", badge_accent=(216, 255, 88),
        focus_x=0.45, focus_y=0.4
    )
    card_tr = add_drop_shadow(card_tr, offset=(8, 16), blur_radius=18, shadow_alpha=200, padding=40)
    card_tr = rotate_card(card_tr, 6.0)
    canvas.alpha_composite(card_tr, (430, 0))

    # Bottom-Left Card: Discussion (p04)
    card_bl = create_glass_card(
        p04_raw, 360, 260, radius=20,
        border_color=(255, 255, 255, 60), border_width=2,
        badge_label="COMMUNITY", badge_accent=(255, 255, 255),
        focus_x=0.5, focus_y=0.35
    )
    card_bl = add_drop_shadow(card_bl, offset=(-6, 14), blur_radius=16, shadow_alpha=180, padding=35)
    card_bl = rotate_card(card_bl, -5.0)
    canvas.alpha_composite(card_bl, (10, 330))

    # Bottom-Right Card: Stage gestures (p03)
    card_br = create_glass_card(
        p03_raw, 370, 260, radius=20,
        border_color=(255, 255, 255, 60), border_width=2,
        badge_label="TALKS", badge_accent=(255, 255, 255),
        focus_x=0.5, focus_y=0.25
    )
    card_br = add_drop_shadow(card_br, offset=(6, 14), blur_radius=16, shadow_alpha=180, padding=35)
    card_br = rotate_card(card_br, 4.0)
    canvas.alpha_composite(card_br, (490, 340))

    # Main Hero Portrait: Ayush cutout (TRANSPARENCY FULLY PRESERVED)
    cutout_processed = process_hero_cutout(cutout_raw)
    cw, ch = cutout_processed.size
    target_cw = 680
    target_ch = int(ch * (target_cw / cw))
    cutout_scaled = cutout_processed.resize((target_cw, target_ch), Image.Resampling.LANCZOS)
    
    cutout_with_shadow = add_drop_shadow(cutout_scaled, offset=(0, 18), blur_radius=22, shadow_alpha=210, padding=50)
    cutout_x = (canvas_w - (target_cw + 100)) // 2 + 5
    cutout_y = 50
    canvas.alpha_composite(cutout_with_shadow, (cutout_x, cutout_y))

    # Tux Glass Badge
    tux_badge = draw_tux_badge(w=175, h=82, radius=18)
    tux_badge = add_drop_shadow(tux_badge, offset=(4, 12), blur_radius=14, shadow_alpha=220, padding=30)
    tux_badge = rotate_card(tux_badge, -2.0)
    canvas.alpha_composite(tux_badge, (660, 520))

    # Neon Ribbon
    pts = [
        (160, 550),
        (300, 630),
        (470, 650),
        (640, 600),
        (780, 560),
        (860, 530)
    ]
    ribbon = draw_neon_curve(canvas_w, canvas_h, pts)
    canvas.alpha_composite(ribbon, (0, 0))

    canvas.save(OUT_MOBILE, "WEBP", quality=95, method=6)
    print(f"Saved Mobile Collage to {OUT_MOBILE}")

if __name__ == "__main__":
    build_desktop_collage()
    build_mobile_collage()
