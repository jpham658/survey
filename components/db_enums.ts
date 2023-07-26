import { Role, Recommend, Favourite } from "@prisma/client";

export const roleToString = {
    [Role.NOT_SELECTED]: "select current role",
    [Role.STUDENT]: "student",
    [Role.JOB]: "job",
    [Role.OTHER]: "other",
    [Role.PREFER_NOT]: "prefer not"
}

export const recommendToString = {
    [Recommend.NOT_SELECTED]: "select one option",
    [Recommend.YES]: "yes",
    [Recommend.NO]: "no",
    [Recommend.MAYBE]: "maybe"
}

export const favouriteToString = {
    [Favourite.NOT_SELECTED]: "select one favourite",
    [Favourite.HAIR]: "hair",
    [Favourite.INTERFACE]: "interface",
    [Favourite.CODE]: "code",
    [Favourite.AESTHETIC]: "aesthetic"
}