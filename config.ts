export const CONFIG = {
  // MUSIC
  audio: {
    bgmUrl:
      "https://res.cloudinary.com/dwynj78fg/video/upload/v1765305404/Timur_-_The_Adams_br4rvj.mp3",
  },

  // Intro overlay customization
  intro: {
    // Optional image to render inside intro profile box. If provided, the
    // app will render this image. Path is relative to project root (e.g.
    // `asset/your-image.jpg`).
    profileImage: "https://res.cloudinary.com/dwynj78fg/image/upload/v1765305830/WhatsApp_Image_2025-12-08_at_05.08.32_deckdz.jpg",
    profileAlt: "Couple initials",
    // Tailwind classes applied to the image. Defaults to cover/full size.
    profileClasses: "object-cover w-full h-full",
    // Fallback HTML fragment (kept for backward compatibility)
    profileHtml:
      '<div class="w-full h-full flex items-center justify-center text-black font-pixel text-lg">A &amp; S</div>',
  },

  // DATES
  weddingDate: "2025-12-14T08:00:00",

  // HERO SECTION
  hero: {
    backgroundUrl: "asset/20251128_201556_493~2.mp4",
    marqueeText:
      "SAVE THE DATE +++ WEDDING OF THE CENTURY +++ ALEX & SAM +++ DEC 31 2025 +++ LOADING HAPPINESS...",
    title: "THE WEDDING",
    subtitle:
      "We are getting married and it's going to be chaotic, beautiful, and totally us.",
  },

  // LOCATION SECTION
  location: {
    dateDisplay: "14 DEC",
    timeDisplay: "08:00 PM - Until we drop",
    placeName: "Mempelai Wanita",
    address: "Dsn. Tlogoarum Rt.01/Rt.05  Ds. Sidorejo Kec. Doko Kab.Blitar",
    mapLink: "https://maps.app.goo.gl/9gRdBe6UunTnFBHu6",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3950.4556364527057!2d112.396907!3d-8.054917999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMDMnMTcuNyJTIDExMsKwMjMnNDguOSJF!5e0!3m2!1sid!2sid!4v1765195944241!5m2!1sid!2sid",
    coordinates: "8°03'17.7° S, 112°23'48.9° E",

    events: {
      akad: {
        title: "Akad Nikah",
        time: "08:00 WIB",
      },
      resepsi: {
        title: "Resepsi",
        time: "13:00 WIB - 15.00 WIB",
      },
      walimah: {
        title: "Walimah Al-'ursy",
        time: "19:00 WIB - Till Drop",
      },
    },
  },

  // COUPLE PROFILES
  couple: {
    groom: {
      name: "Dycta",
      level: "LVL 23",
      photo: "https://res.cloudinary.com/dwynj78fg/image/upload/v1765305137/2025_10_16_06_20_IMG_7537_Small_otjhvm.jpg",
      class: "Paladin",
      likes: "im blue, ",
      quote: "Trust me, I watched a tutorial once.",
      instagramUrl: "https://instagram.com/separuh_manusiaa",
    },
    bride: {
      name: "April",
      level: "LVL 22",
      photo: "https://res.cloudinary.com/dwynj78fg/image/upload/v1765305163/profil_april_nrsclh.jpg",
      class: "Mage",
      likes: "Cats, pink and money",
      quote: "Ready for the co-op campaign.",
      instagramUrl: "https://www.instagram.com/apriliaalifaturr/",
    },
  },

  // GALLERY IMAGES
  gallery: [
    "https://res.cloudinary.com/dwynj78fg/image/upload/v1765305212/Generated_Image_October_17_2025_-_2_31AM_Large_mt2lsn.png",
    "https://res.cloudinary.com/dwynj78fg/image/upload/v1765305183/IMG_7685_20251128_201429_3600_Large_qwkpam.jpg",
    "https://res.cloudinary.com/dwynj78fg/image/upload/v1765305162/IMG_7684_20251128_201412_3600_Large_z7jz3j.jpg",
    "https://res.cloudinary.com/dwynj78fg/image/upload/v1765305142/WhatsApp_Image_2025-12-08_at_15.32.18_Small_ifclzt.jpg",
    "https://res.cloudinary.com/dwynj78fg/image/upload/v1765305142/IMG_7688_20251128_201520_3600_Large_dtpl5u.jpg",
    "https://res.cloudinary.com/dwynj78fg/image/upload/v1765305164/IMG_7683_20251128_201355_3600_Large_xwbb9l.jpg",
  ],

  // GIFTS / BANK
  gift: {
  banks: [
    {
      bankName: "DANA",
      accountNumber: "0882009564652",
      accountHolder: "APRILIA ALIFATURROHMA",
    },
    // Kamu bisa tambah bank lain
    {
      bankName: "BNI",
      accountNumber: "1931284725",
      accountHolder: "APRILIA ALIFATURROHMAH",
    },
      {
      bankName: "Seabank",
      accountNumber: "901480930796",
      accountHolder: "DYCTA ZAKY FIRMANSYAH",
    }
  ]
}

};
