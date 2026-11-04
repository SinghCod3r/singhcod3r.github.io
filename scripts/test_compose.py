import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

PICS_DIR = "/home/ayushcod3r/projects/ayush/ayush_landing_pics"
CUTOUT_PATH = os.path.join(PICS_DIR, "landing_image_1_proper_cut.png")
TEACHING_PATH = os.path.join(PICS_DIR, "updated_teaching_my_landing_second_image.png")
P01_PATH = os.path.join(PICS_DIR, "ayush_portfolio_01_final.jpg")
P03_PATH = os.path.join(PICS_DIR, "ayush_portfolio_03_final.jpg")
P04_PATH = os.path.join(PICS_DIR, "ayush_portfolio_04_final.jpg")

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

def create_rounded_card(
    img: Image.Image,
    target_w: int,
    target_h: int,
    radius: int = 24,
    border_color = (255, 255, 255, 45),
    border_width: int = 2,
    glow_color = None,
    glow_radius: int = 0,
    focus_x: float = 0.5,
    focus_y: float = 0.5
) -> Image.Image:
    card_img = crop_and_fit(img, target_w, target_h, focus_x, focus_y).convert("RGBA")

    scale = 2
    sw, sh = target_w * scale, target_h * scale
    sradius = radius * scale
    sborder_w = border_width * scale

    mask = Image.new("L", (sw, sh), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.rounded_rectangle([0, 0, sw - 1, sh - 1], radius=sradius, fill=255)
    mask = mask.resize((target_w, target_h), Image.Resampling.LANCZOS)

    card_with_mask = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    card_with_mask.paste(card_img, (0, 0), mask=mask)

    border_layer = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(border_layer)
    bdraw.rounded_rectangle(
        [sborder_w // 2, sborder_w // 2, sw - 1 - sborder_w // 2, sh - 1 - sborder_w // 2],
        radius=sradius,
        outline=border_color,
        width=sborder_w
    )
    border_layer = border_layer.resize((target_w, target_h), Image.Resampling.LANCZOS)
    card_with_mask.alpha_composite(border_layer)

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
        glow_canvas.alpha_composite(card_with_mask, (pad, pad))
        return glow_canvas

    return card_with_mask

def add_drop_shadow(img: Image.Image, offset=(0, 18), blur_radius=22, shadow_alpha=180, padding=70) -> Image.Image:
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

def draw_tux_badge(w=200, h=100, radius=20) -> Image.Image:
    badge = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    scale = 2
    sw, sh = w * scale, h * scale
    sradius = radius * scale

    bg_mask = Image.new("L", (sw, sh), 0)
    ImageDraw.Draw(bg_mask).rounded_rectangle([0, 0, sw - 1, sh - 1], radius=sradius, fill=255)
    bg_mask = bg_mask.resize((w, h), Image.Resampling.LANCZOS)

    # Glass background: dark charcoal with high blur appearance
    glass_bg = Image.new("RGBA", (w, h), (18, 20, 24, 220))
    badge.paste(glass_bg, (0, 0), mask=bg_mask)

    # Neon border
    border = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(border)
    bdraw.rounded_rectangle([2, 2, sw - 3, sh - 3], radius=sradius, outline=(216, 255, 88, 200), width=3)
    border = border.resize((w, h), Image.Resampling.LANCZOS)
    badge.alpha_composite(border)

    # Draw Tux inside
    tux_canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    tdraw = ImageDraw.Draw(tux_canvas)
    
    # Tux left: centered vertically
    cx, cy = 50, h // 2
    # Silhouette
    tdraw.ellipse([cx - 24, cy - 32, cx + 24, cy + 32], fill=(255, 255, 255, 240))
    # Belly
    tdraw.ellipse([cx - 16, cy - 12, cx + 16, cy + 28], fill=(15, 17, 20, 240))
    # Eyes
    tdraw.ellipse([cx - 9, cy - 22, cx - 3, cy - 14], fill=(15, 17, 20, 240))
    tdraw.ellipse([cx + 3, cy - 22, cx + 9, cy - 14], fill=(15, 17, 20, 240))
    # Beak
    tdraw.polygon([(cx - 7, cy - 14), (cx + 7, cy - 14), (cx, cy - 6)], fill=(216, 255, 88, 255))
    # Feet
    tdraw.ellipse([cx - 24, cy + 24, cx - 4, cy + 34], fill=(216, 255, 88, 255))
    tdraw.ellipse([cx + 4, cy + 24, cx + 24, cy + 34], fill=(216, 255, 88, 255))

    # Badge text or indicator
    # Glowing dot
    tdraw.ellipse([cx + 45, cy - 18, cx + 55, cy - 8], fill=(216, 255, 88, 255))
    # Mini text pills
    # Draw label "LINUX"
    # Using clean rectangles for pill
    tdraw.rounded_rectangle([cx + 42, cy - 4, cx + 120, cy + 18], radius=6, fill=(255, 255, 255, 15), outline=(255, 255, 255, 30))

    badge.alpha_composite(tux_canvas)
    return badge

def draw_neon_curve(canvas_w, canvas_h, pts) -> Image.Image:
    """Draws a smooth 3D glowing neon ribbon along bezier/spline pts."""
    layer = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    # Interpolate smooth points along spline
    smooth_pts = []
    for i in range(len(pts) - 1):
        p0 = pts[max(0, i - 1)]
        p1 = pts[i]
        p2 = pts[i + 1]
        p3 = pts[min(len(pts) - 1, i + 2)]
        for t in np.linspace(0, 1, 40, endpoint=False):
            # Catmull-Rom spline
            t2 = t * t
            t3 = t2 * t
            x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3)
            y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
            smooth_pts.append((x, y))
    smooth_pts.append(pts[-1])

    # Pass 1: Outer glow
    p1_img = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    p1_draw = ImageDraw.Draw(p1_img)
    for i in range(len(smooth_pts) - 1):
        p1_draw.line([smooth_pts[i], smooth_pts[i + 1]], fill=(216, 255, 88, 50), width=42)
    p1_img = p1_img.filter(ImageFilter.GaussianBlur(18))
    layer.alpha_composite(p1_img)

    # Pass 2: Mid neon glow
    p2_img = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    p2_draw = ImageDraw.Draw(p2_img)
    for i in range(len(smooth_pts) - 1):
        p2_draw.line([smooth_pts[i], smooth_pts[i + 1]], fill=(216, 255, 88, 180), width=16)
    p2_img = p2_img.filter(ImageFilter.GaussianBlur(6))
    layer.alpha_composite(p2_img)

    # Pass 3: Core bright white-lime
    p3_draw = ImageDraw.Draw(layer)
    for i in range(len(smooth_pts) - 1):
        p3_draw.line([smooth_pts[i], smooth_pts[i + 1]], fill=(248, 255, 215, 255), width=5)

    return layer

print("Testing composition components...")
