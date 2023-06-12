import dbImage from "../assets/images/series/dragonball.jpg";
import dbzImage from "../assets/images/series/z.jpg";
import dbKaiImage from "../assets/images/series/kai.jpg";
import dbsImage from "../assets/images/series/super.jpg";
import dbgtImage from "../assets/images/series/gt.jpg";

interface SeriesInfo {
  [key: string]: {
    name: string;
    shortName: string;
    episodes: number;
    image: string;
  };
}

const allSeries: SeriesInfo = {
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
