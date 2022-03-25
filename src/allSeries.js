import dbImage from "./icons/series/dragonball.jpg";
import dbzImage from "./icons/series/z.jpg";
import dbKaiImage from "./icons/series/kai.jpg";
import dbsImage from "./icons/series/super.jpg";
import dbgtImage from "./icons/series/gt.jpg";

const allSeries = {
    db: {
        name: "Dragon Ball ",
        shortName: "db",
        episodes: 153,
        image: dbImage,
    },
    dbz: {
        name: "Dragon Ball Z",
        shortName: "dbz",
        episodes: 291,
        image: dbzImage,
    },
    dbkai: {
        name: "Dragon Ball Kai",
        shortName: "dbkai",
        episodes: 167,
        image: dbKaiImage,
    },
    dbs: {
        name: "Dragon Ball Super",
        shortName: "dbs",
        episodes: 131,
        image: dbsImage,
    },
    dbgt: {
        name: "Dragon Ball GT",
        shortName: "dbgt",
        episodes: 64,
        image: dbgtImage,
    },
};

export default allSeries;
