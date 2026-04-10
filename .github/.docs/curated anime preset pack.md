Absolutely — here’s a larger **curated anime preset pack** with 25 styles, normalized tag naming, and a cleaner taxonomy. Prompt preset systems are easiest to maintain when they separate subject text from reusable modifier classes such as style, lighting, composition, and quality boosters. [arxiv](https://arxiv.org/html/2204.13988)

## Naming schema

I normalized the tags to lower camelCase and kept them semantic rather than model-specific, because prompt modifier systems are typically easier to scale when style modifiers, subject terms, and quality boosters stay distinct. [learnprompting](https://learnprompting.org/docs/image_prompting/style_modifiers)

```txt
# normalized tag conventions
# - lowerCamelCase for all tags
# - broad families first, specific style IDs second
# - avoid mixed spellings like "sci-fi"/"scifi", "multi-view"/"multiview"
# - keep tags descriptive, not UI-oriented

# primary families used below
anime
painting
drawing
illustration
manga
cartoon
cinematic
fantasy
scifi
retro
cute
darkFantasy
sliceOfLife
mecha
portrait
lineArt
watercolor
ink
pixelArt
conceptArt
graphicDesign
fashion
poster
noir
monochrome
vibrant
cozy
dramatic
ethereal
celShaded
```

## Preset pack

```txt
$output
  Painted Anime
    prompt
      [input.description], art by atey ghailan, painterly anime style at pixiv, art by kantoku, in art style of redjuice/necömi/rella/tiv pixiv collab, your name anime art style, masterpiece digital painting, exquisite lighting and composition, inspired by wlop art style, 8k, sharp, very detailed, high resolution, illustration.\n\nOverall, it's an absolute world-class masterpiece painterly anime-inspired digital art. It's an aesthetically pleasing painterly anime-inspired digital artwork with impeccable attention to detail and impressive composition. ^2
      painterly anime artwork, [input.description], world-class masterpiece, fine details, breathtaking artwork, painterly art style, high quality, 8k, very detailed, high resolution, exquisite composition and lighting.\n\nOverall, it's an absolute world-class masterpiece painterly anime artwork. It's an aesthetically pleasing painterly anime artwork with impeccable attention to detail and impressive composition.
    negative = [input.negative]
    meta:tags = [({anime:100, painting:100, paintedAnime:100, drawing:55, cartoon:50})]
    modifiers = [animeModifiers, qualityModifiers]

  Cinematic Anime
    prompt
      [input.description], cinematic anime illustration, filmic composition, dramatic perspective, detailed background, dynamic lighting, volumetric light, rim lighting, anime key visual, polished digital painting, high detail, sharp focus, rich color grading, masterpiece, very detailed, high resolution.\n\nOverall, it's a world-class cinematic anime illustration with striking atmosphere, dramatic framing, and refined lighting.
      [input.description], anime movie still, cinematic shot, beautifully composed scene, dramatic light and shadow, expressive color design, detailed environment, polished anime rendering, high quality, ultra detailed, high resolution, masterpiece.\n\nOverall, it's a breathtaking cinematic anime-style scene with powerful composition and film-like mood.
    negative = [input.negative]
    meta:tags = [({anime:100, cinematic:100, illustration:85, dramatic:90, movieStill:80})]
    modifiers = [animeModifiers, cinematicModifiers, lightingModifiers, qualityModifiers]

  Soft Shoujo
    prompt
      [input.description], soft shoujo anime illustration, delicate linework, pastel color palette, gentle lighting, sparkling atmosphere, expressive eyes, elegant composition, romantic manga aesthetic, polished digital art, high detail, very detailed, high resolution.\n\nOverall, it's a beautiful soft shoujo-inspired anime artwork with graceful color harmony and a dreamy romantic feel.
      [input.description], delicate anime portrait, shoujo manga style, airy colors, subtle blush tones, soft glow, refined features, pretty composition, exquisite detail, high quality, high resolution.\n\nOverall, it's an elegant shoujo-style anime image with softness, charm, and refined presentation.
    negative = [input.negative]
    meta:tags = [({anime:100, shoujo:100, soft:90, pastel:85, romance:80, portrait:70})]
    modifiers = [animeModifiers, moodModifiers, portraitModifiers, qualityModifiers]

  Dark Fantasy Anime
    prompt
      [input.description], dark fantasy anime illustration, dramatic shadows, ominous atmosphere, gothic detail, moody lighting, intricate costume design, haunting environment, painterly anime rendering, masterpiece, sharp, highly detailed, high resolution.\n\nOverall, it's a world-class dark fantasy anime artwork with powerful atmosphere, striking contrast, and rich detail.
      [input.description], anime dark fantasy scene, gothic anime art style, deep shadows, eerie glow, dramatic composition, detailed textures, polished digital painting, very detailed, high quality, high resolution.\n\nOverall, it's a captivating dark fantasy anime illustration with a haunting mood and cinematic impact.
    negative = [input.negative]
    meta:tags = [({anime:100, darkFantasy:100, fantasy:90, gothic:85, dramatic:85, painting:70})]
    modifiers = [animeModifiers, fantasyModifiers, lightingModifiers, qualityModifiers]

  Mecha Anime
    prompt
      [input.description], mecha anime illustration, mechanical detail, futuristic design, hard-surface rendering, clean anime linework, dynamic action composition, glowing tech elements, polished digital artwork, intricate machinery, masterpiece, ultra detailed, sharp, high resolution.\n\nOverall, it's a world-class mecha anime artwork with exceptional mechanical design and high-impact composition.
      [input.description], futuristic anime key visual, mecha design, detailed machinery, sleek armor plating, dynamic perspective, anime sci-fi art, glowing accents, very detailed, crisp, high quality, high resolution.\n\nOverall, it's an impressive mecha anime illustration with technical precision and dramatic energy.
    negative = [input.negative]
    meta:tags = [({anime:100, mecha:100, scifi:95, mechanical:100, futuristic:85, action:75})]
    modifiers = [animeModifiers, scifiModifiers, compositionModifiers, qualityModifiers]

  Slice of Life Anime
    prompt
      [input.description], slice of life anime illustration, warm everyday atmosphere, natural pose, charming expression, cozy setting, soft daylight, clean anime rendering, gentle color palette, detailed scene, polished illustration, high quality, high resolution.\n\nOverall, it's a beautiful slice-of-life anime artwork with warmth, relatability, and pleasing everyday detail.
      [input.description], wholesome anime scene, cozy anime aesthetic, soft colors, natural lighting, expressive character acting, inviting environment, detailed illustration, very polished, high resolution.\n\nOverall, it's a charming slice-of-life anime image with a calm mood and strong visual appeal.
    negative = [input.negative]
    meta:tags = [({anime:100, sliceOfLife:100, cozy:90, wholesome:85, illustration:75, everyday:70})]
    modifiers = [animeModifiers, moodModifiers, lightingModifiers, qualityModifiers]

  Manga Ink
    prompt
      [input.description], manga illustration, black and white inked artwork, screentone shading, crisp line art, strong contrast, detailed hatching, clean panel-ready drawing, expressive composition, highly detailed, sharp, masterpiece.\n\nOverall, it's a stunning manga-style ink drawing with powerful line control and professional black-and-white rendering.
      [input.description], monochrome manga art, refined ink lines, screentones, dramatic shadows, clean contours, detailed illustration, polished comic-style artwork, high detail, masterpiece.\n\nOverall, it's a striking manga-inspired black-and-white illustration with clarity, depth, and dramatic contrast.
    negative = [input.negative]
    meta:tags = [({manga:100, ink:100, monochrome:100, lineArt:95, drawing:90, illustration:70})]
    modifiers = [mangaModifiers, compositionModifiers, qualityModifiers]

  Watercolor Anime
    prompt
      [input.description], watercolor anime illustration, soft pigment washes, delicate edges, airy composition, luminous color blending, handmade paper texture, elegant anime rendering, detailed painting, beautiful lighting, high quality, high resolution.\n\nOverall, it's a world-class watercolor anime artwork with graceful color transitions and painterly softness.
      [input.description], anime watercolor painting, gentle brushwork, translucent colors, dreamy atmosphere, soft detail, artistic composition, refined illustration, very detailed, high resolution.\n\nOverall, it's a lovely watercolor anime image with expressive brushwork and a serene painterly finish.
    negative = [input.negative]
    meta:tags = [({anime:100, watercolor:100, painting:100, soft:85, illustration:80, artistic:75})]
    modifiers = [animeModifiers, paintingModifiers, moodModifiers, qualityModifiers]

  Retro 90s Anime
    prompt
      [input.description], retro 90s anime art style, classic cel animation look, bold shapes, nostalgic color palette, vintage anime character design, hand-painted cel feel, detailed illustration, clean linework, high quality, expressive composition.\n\nOverall, it's a gorgeous retro anime artwork with nostalgic charm and authentic cel-era energy.
      [input.description], vintage anime illustration, 1990s anime aesthetic, cel shading, nostalgic tones, expressive faces, classic anime proportions, polished retro-inspired artwork, detailed, high resolution.\n\nOverall, it's a strong retro anime-style image with classic visual appeal and old-school anime atmosphere.
    negative = [input.negative]
    meta:tags = [({anime:100, retro:100, celShaded:95, nostalgic:85, vintage:85, illustration:70})]
    modifiers = [animeModifiers, retroModifiers, qualityModifiers]

  Chibi Cute
    prompt
      [input.description], chibi anime illustration, super deformed proportions, cute expression, clean line art, vibrant colors, playful composition, adorable character design, polished digital artwork, very detailed, high quality, high resolution.\n\nOverall, it's an irresistibly cute chibi anime artwork with strong character appeal and polished presentation.
      [input.description], adorable anime chibi art, tiny body proportions, oversized head, charming expression, colorful rendering, crisp details, lively composition, polished illustration, high resolution.\n\nOverall, it's a delightful chibi-style anime image with playful energy and excellent finish.
    negative = [input.negative]
    meta:tags = [({anime:100, chibi:100, cute:100, colorful:80, cartoon:70, illustration:75})]
    modifiers = [animeModifiers, cuteModifiers, qualityModifiers]

  Heroic Shonen
    prompt
      [input.description], heroic shonen anime illustration, dynamic pose, dramatic perspective, bold expression, action-heavy composition, energetic linework, vibrant anime colors, polished digital artwork, high detail, masterpiece, very detailed, high resolution.\n\nOverall, it's a high-impact shonen anime artwork with strong movement, intensity, and heroic appeal.
      [input.description], action anime key visual, shonen battle energy, dynamic framing, expressive anatomy, speed and momentum, polished illustration, high quality, ultra detailed, high resolution.\n\nOverall, it's a thrilling shonen-inspired anime image with power, motion, and bold presentation.
    negative = [input.negative]
    meta:tags = [({anime:100, shonen:100, action:95, heroic:90, dynamic:90, vibrant:75})]
    modifiers = [animeModifiers, actionModifiers, compositionModifiers, qualityModifiers]

  Elegant Josei
    prompt
      [input.description], elegant josei-inspired anime illustration, refined features, mature fashion styling, graceful composition, tasteful color palette, polished linework, soft sophisticated lighting, high detail, beautiful digital art, high resolution.\n\nOverall, it's a refined josei-style anime artwork with maturity, elegance, and visual grace.
      [input.description], mature anime portrait, tasteful josei aesthetic, polished rendering, soft luxury palette, poised expression, detailed illustration, high quality, high resolution.\n\nOverall, it's a sophisticated anime image with elegance and polished emotional realism.
    negative = [input.negative]
    meta:tags = [({anime:100, josei:100, elegant:95, portrait:85, fashion:70, refined:90})]
    modifiers = [animeModifiers, portraitModifiers, fashionModifiers, qualityModifiers]

  School Romance
    prompt
      [input.description], school romance anime illustration, youthful atmosphere, heartfelt expression, polished anime rendering, soft lighting, clean composition, emotionally warm color palette, detailed environment, high quality, high resolution.\n\nOverall, it's a polished school romance anime artwork with warmth, tenderness, and strong emotional charm.
      [input.description], romantic anime scene, school setting, soft blush tones, pretty composition, expressive eyes, gentle daylight, clean linework, detailed illustration, high resolution.\n\nOverall, it's a sweet romance-focused anime image with softness and strong character appeal.
    negative = [input.negative]
    meta:tags = [({anime:100, romance:100, school:90, soft:80, emotional:75, sliceOfLife:70})]
    modifiers = [animeModifiers, moodModifiers, lightingModifiers, qualityModifiers]

  Magical Girl
    prompt
      [input.description], magical girl anime illustration, sparkling magical effects, elegant transformation aesthetic, ornate costume design, bright polished colors, radiant lighting, beautiful anime rendering, detailed composition, masterpiece, very detailed, high resolution.\n\nOverall, it's a dazzling magical-girl anime artwork with vivid charm, elegance, and fantasy sparkle.
      [input.description], fantasy anime heroine, magical energy, graceful pose, shining accessories, colorful anime art, polished details, luminous composition, high quality, high resolution.\n\nOverall, it's a vibrant magical-girl-style anime image with refined fantasy beauty and strong visual energy.
    negative = [input.negative]
    meta:tags = [({anime:100, magicalGirl:100, fantasy:90, sparkles:80, colorful:85, elegant:75})]
    modifiers = [animeModifiers, fantasyModifiers, cuteModifiers, qualityModifiers]

  Idol Stage Anime
    prompt
      [input.description], idol anime illustration, stage performance atmosphere, dazzling concert lights, fashionable costume styling, energetic pose, vibrant color design, polished anime rendering, high detail, glamorous composition, high resolution.\n\nOverall, it's a lively idol-style anime artwork with stage energy, spectacle, and visual polish.
      [input.description], anime stage performance, spotlight lighting, charming idol fashion, expressive performance pose, colorful concert mood, clean detailed illustration, high quality, high resolution.\n\nOverall, it's a bright and energetic idol anime image with strong performance appeal.
    negative = [input.negative]
    meta:tags = [({anime:100, idol:100, stage:90, performance:90, fashion:75, vibrant:80})]
    modifiers = [animeModifiers, lightingModifiers, fashionModifiers, qualityModifiers]

  Sci-Fi Key Visual
    prompt
      [input.description], futuristic anime key visual, sleek sci-fi design, cinematic framing, glowing interfaces, atmospheric lighting, clean detailed rendering, advanced technology motifs, polished illustration, masterpiece, ultra detailed, high resolution.\n\nOverall, it's a striking sci-fi anime artwork with cinematic scale and polished futuristic design.
      [input.description], anime science fiction scene, luminous technology, dramatic perspective, futuristic environment, crisp composition, highly detailed digital art, high quality, high resolution.\n\nOverall, it's a compelling sci-fi anime image with sleek worldbuilding and strong visual structure.
    negative = [input.negative]
    meta:tags = [({anime:100, scifi:100, cinematic:80, futuristic:95, illustration:80, technology:85})]
    modifiers = [animeModifiers, scifiModifiers, cinematicModifiers, qualityModifiers]

  Cyberpunk Neon
    prompt
      [input.description], cyberpunk anime illustration, neon-lit city atmosphere, reflective surfaces, night scene, glowing signs, futuristic fashion, intense color contrast, cinematic composition, polished digital artwork, sharp, high detail, high resolution.\n\nOverall, it's a vivid cyberpunk anime artwork with electric atmosphere and striking night-time style.
      [input.description], anime cyberpunk scene, glowing neon light, urban sci-fi mood, detailed city background, dramatic contrast, polished rendering, high quality, very detailed, high resolution.\n\nOverall, it's a stylish cyberpunk anime image with strong color, mood, and cinematic energy.
    negative = [input.negative]
    meta:tags = [({anime:100, cyberpunk:100, scifi:90, neon:100, night:85, cinematic:75})]
    modifiers = [animeModifiers, scifiModifiers, lightingModifiers, qualityModifiers]

  Post-Apocalyptic Anime
    prompt
      [input.description], post-apocalyptic anime illustration, ruined environment, atmospheric dust, dramatic sky, survivalist styling, moody lighting, detailed background storytelling, polished anime rendering, high detail, high resolution.\n\nOverall, it's a gripping post-apocalyptic anime artwork with environmental depth and a strong survival mood.
      [input.description], anime wasteland scene, abandoned city ruins, dramatic atmosphere, weathered details, cinematic composition, polished digital illustration, high quality, very detailed, high resolution.\n\nOverall, it's a powerful apocalypse-themed anime image with strong setting design and emotional weight.
    negative = [input.negative]
    meta:tags = [({anime:100, apocalypse:100, ruins:90, dramatic:85, environmental:80, cinematic:70})]
    modifiers = [animeModifiers, fantasyModifiers, cinematicModifiers, qualityModifiers]

  Historical Kimono Anime
    prompt
      [input.description], historical anime illustration, traditional kimono styling, elegant textile detail, refined posture, delicate color palette, graceful composition, polished anime rendering, cultural atmosphere, high detail, high resolution.\n\nOverall, it's a graceful historical anime artwork with beautiful costume detail and elegant presentation.
      [input.description], anime period scene, kimono fashion, refined composition, delicate lighting, intricate fabric patterns, polished illustration, high quality, high resolution.\n\nOverall, it's an elegant period-inspired anime image with strong textile beauty and classical atmosphere.
    negative = [input.negative]
    meta:tags = [({anime:100, historical:100, kimono:100, elegant:85, fashion:80, refined:80})]
    modifiers = [animeModifiers, fashionModifiers, portraitModifiers, qualityModifiers]

  Anime Noir
    prompt
      [input.description], anime noir illustration, moody monochrome palette, dramatic shadows, noir lighting, urban tension, rain-soaked atmosphere, cinematic framing, strong contrast, polished detailed artwork, high resolution.\n\nOverall, it's a stylish anime noir artwork with suspense, contrast, and cinematic mood.
      [input.description], noir anime scene, deep shadows, moody city environment, crime-drama tone, monochrome or limited palette, dramatic composition, detailed illustration, high quality, high resolution.\n\nOverall, it's a tense and elegant noir-style anime image with strong lighting and atmosphere.
    negative = [input.negative]
    meta:tags = [({anime:100, noir:100, monochrome:75, cinematic:85, dramatic:95, urban:70})]
    modifiers = [animeModifiers, cinematicModifiers, lightingModifiers, qualityModifiers]

  Painterly Fantasy
    prompt
      [input.description], painterly fantasy illustration, rich environment design, dramatic atmosphere, elegant brushwork, luminous highlights, intricate fantasy details, polished concept-art finish, masterpiece, very detailed, high resolution.\n\nOverall, it's a breathtaking painterly fantasy artwork with depth, richness, and high-end illustration quality.
      [input.description], fantasy painting, detailed scene composition, magical ambiance, refined brush textures, atmospheric depth, polished illustration, high quality, high resolution.\n\nOverall, it's a beautifully rendered fantasy image with painterly sophistication and immersive worldbuilding.
    negative = [input.negative]
    meta:tags = [({fantasy:100, painting:100, conceptArt:85, illustration:90, dramatic:80, ethereal:70})]
    modifiers = [fantasyModifiers, paintingModifiers, lightingModifiers, qualityModifiers]

  Concept Art Illustration
    prompt
      [input.description], concept art illustration, strong silhouette design, environment storytelling, cinematic lighting, exploratory visual development, polished digital painting, detailed materials, production-quality rendering, high detail, high resolution.\n\nOverall, it's a professional concept-art-style illustration with strong design intent and cinematic readability.
      [input.description], production concept art, detailed shapes, visual development painting, refined composition, atmospheric depth, polished artwork, high quality, high resolution.\n\nOverall, it's a studio-quality concept art image with strong structure and presentation.
    negative = [input.negative]
    meta:tags = [({conceptArt:100, illustration:100, painting:85, cinematic:75, design:85, detailed:80})]
    modifiers = [compositionModifiers, lightingModifiers, qualityModifiers]

  Oil Painting Portrait
    prompt
      [input.description], oil painting portrait, rich painterly texture, classical brushwork, lifelike form, dramatic light, elegant color harmony, refined composition, museum-quality painting, highly detailed, masterpiece, high resolution.\n\nOverall, it's a stunning oil-painted portrait with traditional richness and masterful lighting.
      [input.description], classical portrait painting, expressive brush strokes, layered paint texture, sophisticated composition, detailed face rendering, high quality, high resolution.\n\nOverall, it's a refined portrait painting with timeless atmosphere and painterly depth.
    negative = [input.negative]
    meta:tags = [({painting:100, oilPainting:100, portrait:100, classical:85, refined:80, dramatic:70})]
    modifiers = [paintingModifiers, portraitModifiers, lightingModifiers, qualityModifiers]

  Watercolor Storybook
    prompt
      [input.description], watercolor storybook illustration, delicate washes, whimsical charm, soft paper texture, gentle composition, hand-painted feel, airy colors, beautiful detail, polished illustrative finish, high resolution.\n\nOverall, it's a lovely storybook watercolor artwork with warmth, softness, and handcrafted appeal.
      [input.description], children's book watercolor illustration, charming painted scene, soft edges, tender color harmony, detailed yet airy composition, high quality, high resolution.\n\nOverall, it's a whimsical illustrated image with storybook warmth and painterly grace.
    negative = [input.negative]
    meta:tags = [({watercolor:100, illustration:100, storybook:100, painting:85, whimsical:85, soft:80})]
    modifiers = [paintingModifiers, moodModifiers, qualityModifiers]

  Graphic Poster
    prompt
      [input.description], graphic poster design, bold composition, striking typography-ready layout, strong shapes, limited color palette, clean visual hierarchy, high-impact illustration, modern poster aesthetic, sharp detail, high resolution.\n\nOverall, it's a compelling graphic poster image with strong structure and immediate visual impact.
      [input.description], poster-style artwork, graphic design sensibility, clean bold forms, dramatic arrangement, print-ready visual clarity, polished high-resolution illustration.\n\nOverall, it's a sleek poster-oriented image with graphic strength and refined composition.
    negative = [input.negative]
    meta:tags = [({graphicDesign:100, poster:100, illustration:80, bold:85, clean:80, composition:90})]
    modifiers = [graphicModifiers, compositionModifiers, qualityModifiers]

  Fashion Editorial
    prompt
      [input.description], fashion editorial illustration, luxury styling, elegant pose, refined composition, premium material detail, controlled lighting, polished magazine-quality artwork, high detail, high resolution.\n\nOverall, it's a sophisticated fashion editorial image with refined styling and premium presentation.
      [input.description], editorial fashion artwork, elegant silhouette, upscale mood, polished rendering, beautiful garment detail, tasteful composition, high quality, high resolution.\n\nOverall, it's a sleek fashion-focused image with strong editorial sophistication.
    negative = [input.negative]
    meta:tags = [({fashion:100, editorial:100, elegant:90, portrait:75, refined:85, luxury:80})]
    modifiers = [fashionModifiers, portraitModifiers, lightingModifiers, qualityModifiers]

  Pixel Art
    prompt
      [input.description], pixel art illustration, crisp pixel grid, deliberate sprite detailing, limited palette, retro game aesthetic, readable silhouette, clean composition, polished pixel rendering, high clarity.\n\nOverall, it's a polished pixel art image with strong readability, retro charm, and disciplined detail.
      [input.description], retro pixel artwork, sprite-like form, carefully placed pixels, nostalgic game-art feel, clean colors, charming composition, high quality pixel illustration.\n\nOverall, it's a strong pixel-art-style image with clarity, charm, and classic game-like appeal.
    negative = [input.negative]
    meta:tags = [({pixelArt:100, retro:90, gameArt:90, illustration:70, nostalgic:75, clean:70})]
    modifiers = [retroModifiers, graphicModifiers]

  Cel-Shaded Illustration
    prompt
      [input.description], cel-shaded illustration, bold clean linework, flat color separation, crisp highlights, stylized shading, dynamic silhouette, polished cartoon-anime hybrid rendering, high detail, high resolution.\n\nOverall, it's a striking cel-shaded artwork with strong graphic readability and polished stylization.
      [input.description], cel-shaded art style, vibrant clean colors, bold contour lines, sharp stylized rendering, expressive composition, detailed illustration, high quality, high resolution.\n\nOverall, it's a vivid cel-shaded image with clarity, energy, and strong visual punch.
    negative = [input.negative]
    meta:tags = [({celShaded:100, illustration:100, lineArt:85, cartoon:80, vibrant:80, stylized:85})]
    modifiers = [graphicModifiers, compositionModifiers, qualityModifiers]
```

## Modifier libraries

This structure follows the common prompt-engineering pattern of keeping reusable modifiers grouped by function, such as style, lighting, quality, and composition, instead of duplicating those terms inside every preset. [getprompts](https://getprompts.me/guides/prompt-modifiers)

```txt
animeModifiers
  style
    ghibli = , Ghibli-inspired anime art style
    yourName = , Your Name-inspired anime art style
    paprika = , Paprika-inspired anime art style
    mha = , My Hero Academia-inspired anime style
    hxh = , Hunter x Hunter-inspired anime style
    aot = , Attack on Titan-inspired anime style
  effect
    multiView = , multiple views
    toon = , cartoon-style bold line work, vibrant colors, cel shading
    vintage = , cel shading, vintage anime
    ethereal = , glow, god rays, ethereal, dreamy, heavenly, otherworldly
    outline = , outline, white outline

cinematicModifiers
  shot
    closeUp = , cinematic close-up
    mediumShot = , cinematic medium shot
    wideShot = , cinematic wide shot
    overShoulder = , over-the-shoulder composition
    lowAngle = , dramatic low-angle shot
    highAngle = , high-angle cinematic framing
  effect
    anamorphic = , anamorphic lens look, cinematic bokeh
    filmGrain = , subtle film grain
    letterbox = , movie still composition
    motionBlur = , dynamic motion blur

fantasyModifiers
  theme
    gothic = , gothic fantasy aesthetic
    holy = , holy light, divine fantasy atmosphere
    cursed = , cursed aura, ominous fantasy mood
    arcane = , arcane symbols, magical energy
    royal = , regal fantasy styling, ornate details
  environment
    ruins = , ancient ruins
    cathedral = , gothic cathedral setting
    forest = , enchanted forest
    castle = , dark fantasy castle
    underworld = , infernal fantasy environment
  effect
    magicGlow = , glowing magic effects
    embers = , drifting embers
    mist = , heavy mist
    aura = , powerful aura

scifiModifiers
  style
    cyberpunk = , cyberpunk anime aesthetic
    cleanFuturism = , sleek futuristic design
    militaryScifi = , military science fiction design language
    spaceOpera = , grand space opera aesthetic
  elements
    hologram = , holographic interface elements
    neonTech = , glowing technological accents
    exosuit = , detailed powered armor
    spaceship = , futuristic spacecraft elements
    robotics = , advanced robotics detail
  effect
    energyCore = , glowing energy core
    scanLines = , subtle scanline effect
    digitalHaze = , digital atmosphere
    plasma = , plasma glow

mangaModifiers
  ink
    hatching = , detailed cross-hatching
    screentone = , screentone shading
    heavyBlacks = , bold black ink shadows
    cleanInk = , clean crisp ink lines
  layout
    panelFeel = , manga panel composition
    splashPage = , dramatic splash page layout
    speedLines = , speed lines
    impactFrame = , impact-focused framing
  tone
    seinen = , seinen manga tone
    shonen = , shonen manga intensity
    josei = , josei manga elegance

paintingModifiers
  medium
    gouache = , gouache painting texture
    watercolorBloom = , watercolor bloom effects
    inkWash = , watercolor and ink wash
    texturedPaper = , textured paper surface
    oilPaint = , rich oil paint texture
  brushwork
    loose = , loose expressive brushwork
    refined = , refined painterly detailing
    softBlend = , soft color blending
    visibleStrokes = , visible brush strokes
  mood
    airy = , airy painterly atmosphere
    luminous = , luminous painted lighting
    poetic = , poetic visual mood

retroModifiers
  era
    eighties = , 1980s anime aesthetic
    nineties = , 1990s anime aesthetic
    early2000s = , early 2000s anime feel
  look
    celPaint = , hand-painted cel look
    vhs = , subtle VHS nostalgia
    oldPrint = , vintage print texture
    broadcast = , classic TV anime look
  color
    mutedRetro = , nostalgic muted color palette
    saturatedRetro = , bold retro anime colors

cuteModifiers
  expression
    sparklyEyes = , sparkly eyes
    blush = , cute blush
    happy = , cheerful adorable expression
    pout = , tiny pout
  styling
    mascot = , mascot-like cuteness
    pastel = , pastel cute palette
    plush = , plush-like softness
    sticker = , sticker-like clean silhouette
  effect
    hearts = , floating hearts
    sparkles = , cute sparkles
    bubbly = , bubbly playful energy

moodModifiers
  mood
    cozy = , cozy warm atmosphere
    dreamy = , dreamy mood
    melancholy = , soft melancholic feeling
    romantic = , romantic atmosphere
    peaceful = , peaceful everyday mood
  color
    pastel = , pastel tones
    warm = , warm color palette
    cool = , cool soft tones
  effect
    glow = , soft glow
    haze = , atmospheric haze
    sparkle = , subtle sparkles

lightingModifiers
  time
    sunrise = , sunrise lighting
    daylight = , natural daylight
    sunset = , sunset glow
    night = , night scene lighting
    moonlight = , moonlit atmosphere
  quality
    softLight = , soft diffused light
    dramatic = , dramatic contrast lighting
    backlit = , strong backlighting
    ambient = , ambient cinematic light
  effect
    godRays = , god rays
    bloom = , soft bloom
    lensFlare = , subtle lens flare

compositionModifiers
  framing
    centered = , centered composition
    dynamic = , dynamic composition
    diagonal = , diagonal flow composition
    portrait = , portrait-focused framing
    fullBody = , full-body composition
  perspective
    foreshortening = , dramatic foreshortening
    widePerspective = , wide perspective
    heroic = , heroic perspective
    intimate = , intimate framing
  motion
    actionPose = , dynamic action pose
    flowingFabric = , flowing clothing and fabric
    wind = , wind-swept motion

portraitModifiers
  focus
    faceFocus = , face-focused composition
    bustShot = , bust portrait framing
    expressiveEyes = , expressive eyes
    detailedFace = , highly detailed facial rendering
  styling
    elegantPose = , elegant pose
    naturalPose = , natural pose
    profile = , profile view
    threeQuarter = , three-quarter portrait view

fashionModifiers
  styling
    couture = , couture fashion styling
    streetwear = , stylish streetwear
    layeredFabric = , layered garment detail
    luxuryTextiles = , luxurious textile detail
  presentation
    runway = , runway-inspired presentation
    editorial = , editorial fashion mood
    catalog = , fashion catalog cleanliness
    premium = , premium styling

actionModifiers
  energy
    explosive = , explosive action energy
    speed = , sense of speed
    battle = , battle intensity
    impact = , high-impact motion
  effects
    debris = , flying debris
    sparks = , sparks and impact effects
    shockwave = , shockwave effect
    streaks = , motion streaks

graphicModifiers
  style
    boldShapes = , bold graphic shapes
    limitedPalette = , limited color palette
    cleanEdges = , clean hard edges
    printReady = , print-ready clarity
  layout
    posterLayout = , poster-like layout
    centeredGraphic = , strong centered graphic composition
    asymmetry = , asymmetric graphic balance
    negativeSpace = , deliberate negative space

qualityModifiers
  finish
    masterpiece = , masterpiece
    bestQuality = , best quality
    highQuality = , high quality
    veryDetailed = , very detailed
    ultraDetailed = , ultra detailed
    sharp = , sharp focus
  output
    highRes = , high resolution
    crisp = , crisp details
    polished = , polished finish
    professional = , professional-grade rendering
```

## Notes for maintenance

A stable preset library usually benefits from a consistent taxonomy: subject first, then style modifiers, then quality or effect modifiers, with repeating terms used sparingly because repetition is itself a prompt-strengthening technique in some workflows. The other useful rule is to keep franchise-inspired or artist-inspired triggers isolated inside modifier groups, so you can swap them out later without renaming your whole preset pack. [blog.athina](https://blog.athina.ai/a-taxonomy-of-prompt-modifiers-for-text-to-image-generation)

## Recommended next cleanup

If you want this even more production-ready, the next step is to split each preset into:

- `basePrompt`
- `malePromptOverride`
- `femalePromptOverride`
- `negative`
- `meta:tags`
- `modifiers`

That makes gender-bias correction, model-specific fallbacks, and UI filtering much easier in larger libraries. [stable-diffusion-art](https://stable-diffusion-art.com/style-presets/)

Would you like the next pass as a strict JSON schema-friendly structure instead of this DSL format?
