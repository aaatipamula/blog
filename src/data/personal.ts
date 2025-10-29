interface SocialMedia {
  name: string;
  icon: string;
  url: string;
};

interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  socialMedia: SocialMedia[];
};

export default {
  firstName: "Aniketh",
  lastName: "Aatipamula",
  email: "aaatipamula@gmail.com",
  website: "https://aniketh.dev",
  socialMedia: [
    {
      name: "GitHub",
      icon: "bi-github",
      url: "https://github.com"
    },
    {
      name: "Spotify",
      icon: "bi-spotify",
      url: "https://open.spotify.com/user/nv8okcbb58h7nv3tkwszvh1ff?si=ecdd77cc1a654813"
    },
  ]
} as PersonalData;
