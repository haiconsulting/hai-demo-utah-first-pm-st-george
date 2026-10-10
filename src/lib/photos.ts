import type { StaticImageData } from "next/image";
import buildingArchedEntry from "@/assets/photos/building-arched-entry.webp";
import buildingArchedEntrySm from "@/assets/photos/building-arched-entry-480.webp";
import communitySignBrick from "@/assets/photos/community-sign-brick.webp";
import communitySignBrickSm from "@/assets/photos/community-sign-brick-480.webp";
import communitySignPalms from "@/assets/photos/community-sign-palms-lava.webp";
import communitySignPalmsSm from "@/assets/photos/community-sign-palms-lava-480.webp";
import communitySignSagewood from "@/assets/photos/community-sign-sagewood.webp";
import communitySignSagewoodSm from "@/assets/photos/community-sign-sagewood-480.webp";
import duplex from "@/assets/photos/duplex-two-garages.webp";
import duplexSm from "@/assets/photos/duplex-two-garages-480.webp";
import homeDarkGarage from "@/assets/photos/home-dark-garage.webp";
import homeDarkGarageSm from "@/assets/photos/home-dark-garage-480.webp";
import homeStucco from "@/assets/photos/home-stucco-tile-roof.webp";
import homeStuccoSm from "@/assets/photos/home-stucco-tile-roof-480.webp";
import farmhouse from "@/assets/photos/modern-farmhouse.webp";
import farmhouseSm from "@/assets/photos/modern-farmhouse-800.webp";
import townhomes from "@/assets/photos/townhomes-palm.webp";
import townhomesSm from "@/assets/photos/townhomes-palm-480.webp";

/** Each photo ships a small and a large file; ResponsiveImg turns the pair into a srcset. */
export type Photo = { small: StaticImageData; large: StaticImageData };

export const photos = {
  buildingArchedEntry: { small: buildingArchedEntrySm, large: buildingArchedEntry },
  communitySignBrick: { small: communitySignBrickSm, large: communitySignBrick },
  communitySignPalms: { small: communitySignPalmsSm, large: communitySignPalms },
  communitySignSagewood: { small: communitySignSagewoodSm, large: communitySignSagewood },
  duplex: { small: duplexSm, large: duplex },
  homeDarkGarage: { small: homeDarkGarageSm, large: homeDarkGarage },
  homeStucco: { small: homeStuccoSm, large: homeStucco },
  farmhouse: { small: farmhouseSm, large: farmhouse },
  townhomes: { small: townhomesSm, large: townhomes },
} satisfies Record<string, Photo>;
