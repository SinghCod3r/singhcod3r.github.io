import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont

PICS_DIR = "/home/ayushcod3r/projects/ayush/ayush_landing_pics"
CUTOUT_PATH = os.path.join(PICS_DIR, "landing_image_1_proper_cut.png")
TEACHING_PATH = os.path.join(PICS_DIR, "updated_teaching_my_landing_second_image.png")
P01_PATH = os.path.join(PICS_DIR, "ayush_portfolio_01_final.jpg")
P03_PATH = os.path.join(PICS_DIR, "ayush_portfolio_03_final.jpg")
P04_PATH = os.path.join(PICS_DIR, "ayush_portfolio_04_final.jpg")

def grade_image(img: Image.Image, contrast=1.12, saturation=0.95, cool_tint=True) -> Image.Image:
    """Balances indoor lighting to fit the dark cyberpunk/open-source developer theme."""
    img_rgb = img.convert("RGB")
    # Enhance contrast
    enh_c = ImageEnhance.Contrast(img_rgb)
    img_c = enh_c.enhance(contrast)
    # Enhance/balance saturation
    enh_s = ImageEnhance.Color(img_c)
    img_s = enh_s.enhance(saturation)

    if cool_tint:
        # Subtle cool tint: slightly reduce red cast, preserve crisp neutrals
        arr = np.array(img_s, dtype=np.float32)
        arr[:, :, 0] *= 0.97  # Red
        arr[:, :, 1] *= 0.99  # Green
        arr[:, :, 2] *= 1.03  # Blue
        img_s = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

    return img_s.convert("RGBA")

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
    border_color = (255, 255, 255, 45),
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

    scale = 2
    sw, sh = target_w * scale, target_h * scale
    sradius = radius * scale
    sborder_w = border_width * scale

    # Mask with rounded corners
    mask = Image.new("L", (sw, sh), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.rounded_rectangle([0, 0, sw - 1, sh - 1], radius=sradius, fill=255)
    mask = mask.resize((target_w, target_h), Image.Resampling.LANCZOS)

    card_with_mask = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    card_with_mask.paste(card_img, (0, 0), mask=mask)

    # Specular top edge glass sheen
    sheen = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(sheen)
    # Subtle top highlight
    sdraw.line([(radius, 1), (target_w - radius, 1)], fill=(255, 255, 255, 90), width=1)
    card_with_mask.alpha_composite(sheen)

    # Subtle bottom vignette to ensure card depth
    vignette = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette)
    v_start = int(target_h * 0.65)
    for y in range(v_start, target_h):
        prog = (y - v_start) / (target_h - v_start)
        alpha_val = int(prog * 120)
        vdraw.line([(0, y), (target_w, y)], fill=(7, 8, 10, alpha_val))
    vignette.putalpha(mask)
    card_with_mask.alpha_composite(vignette)

    # Glass tag / badge inside card linking to UI theme
    if badge_label:
        badge_canvas = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
        bdraw = ImageDraw.Draw(badge_canvas)
        
        # Pill position at bottom-left of the card
        bx, by = 16, target_h - 38
        bw = len(badge_label) * 8 + 36
        bh = 24
        
        # Glass pill background
        bdraw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=12, fill=(18, 20, 24, 210), outline=(255, 255, 255, 40), width=1)
        # Pulsing dot
        bdraw.ellipse([bx + 8, by + 8, bx + 16, by + 16], fill=(*badge_accent, 255))
        # Label text using simple clean monospace bitmap representation or draw text
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf", 10)
        except Exception:
            font = ImageFont.load_default()
        bdraw.text((bx + 22, by + 5), badge_label, font=font, fill=(240, 240, 233, 230))
        
        card_with_mask.alpha_composite(badge_canvas)

    # Draw crisp border
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

print("Card generator tested successfully")
