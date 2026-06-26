<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Overview: IBL 2K26

**IBL** stands for **ITS Basketball League**, which is an annual basketball tournament hosted by the student basketball club (**UKM Basket**) at the **Institut Teknologi Sepuluh Nopember (ITS)**.

This repository contains both the frontend and backend codebase for the project. This directory specifically houses the frontend web application for the **IBL 2K26** edition, including the landing page, event information, and the registration portal.

---

## Registration Page Design & Layout Context

The registration page layout is designed to overlay key functional components onto a high-resolution background asset: [Full_Page_Desktop.png](file:///c:/Users/justi/Documents/IBL/frontend/public/images/Full_Page_Desktop.png) (dimensions: `2880px` wide by `6646px` tall, artboard-equivalent `1440px` by `3323px`).

### 1. Section Dividers
In [page.tsx](file:///c:/Users/justi/Documents/IBL/frontend/app/register/page.tsx), the page is split vertically to align with background imagery coordinates:
- **LandingSection**: `height: 22.57%` (y: 0 to 1500px on 6646px scale)
- **MidSection**: `height: 45.14%` (y: 1500px to 4500px on 6646px scale)
- **FormSection**: `height: 32.29%` (y: 4500px to 6646px on 6646px scale)

### 2. Sizing & Alignment Coordinates (Figma to Code)
To ensure the form cards overlay correctly on the background court graphics across all browser viewport sizes, we map the Figma artboard design pixels (based on a `1440px` viewport width) into responsive `vw` and percentage styles:
- **Horizontal offsets & widths**: `calc(100% * pixelValue / 1440)`
- **Vertical offsets & heights**: `calc(100vw * pixelValue / 1440)`

#### Step 4: Upload Berkas Box Coordinates
The upload container (CV, KTM, Twibbon, Bukti Follow, Portofolio grid) follows the exact same sizing and position coordinates as the normal form steps for visual consistency:
- **Width**: `54%` (derived from Figma dimensions `863px` / `1600px` canvas reference)
- **Height**: `72%`
- **Top**: `15%`
- **Left**: Centered horizontally (`left-1/2 -translate-x-1/2` or `left: 50%`, `transform: translateX(-50%)`)
- **Border styling**: Linear Gradient: `#F4631E` -> `#893310` -> `#7E0202` (rendered dynamically using `background-clip` and `background-origin` to support rounded corners).
- **Internal divider lines**: Slanted at 4 degrees using matching gradient-stop colors `#893310` and `#7E0202`.
- **Navigation Row**: Positioned at `top: 89%`, centered (`left-1/2 -translate-x-1/2`), with width `74%` (exactly matching the normal form steps navigation row to maintain uniformity).

#### Steps 1-3: Form Section Styling
The normal form steps (Informasi Umum, Subdivisi 1, Subdivisi 2) follow the second form reference composition:
- `star bg.png` and `Sinar Atas.svg` are decorative absolute layers inside `FormSection`; they must not add layout height or push content.
- Do not add a new solid background color in `FormSection`; preserve the page/background imagery already provided by `page.tsx`.
- Header badge, form card, and navigation row use absolute percentage coordinates inside the fixed FormSection bounds to prevent white overflow below the section.
- For FormSection vertical placement, prefer section-height percentages (for example `top: "14%"`) over `100vw` math; `100vw` can exceed the fixed FormSection height on wide desktop screens.
- The header badge should stay compact: red fill, black border, black offset shadow, Hollywood font, and tight line-height.
- The form card and bottom navigation must remain inside the FormSection height on desktop; avoid flow-based vertical stacking (`py-*` + natural content height) for the main form layout.
