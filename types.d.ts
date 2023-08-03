export interface MovieInfo {
  name: string;
  number: string;
  image: string;
  series: string;
  info: string;
}

export interface SeriesInfo {
  name: string;
  shortName: string;
  episodes: number;
  image: string;
}

interface episode {
  dub: languageOption;
  sub: languageOption;
  episodeInfo: string;
}

interface source {
  source: string;
  video: string;
}

interface languageOption {
  sources: Array<source>;
  episodeLength: number;
}

interface file {
  file: string;
  label: string;
  type: string;
}

export interface sourceFiles {
  files: Array<file>;
  introOffset: number;
  outroOffset: number;
}

export interface StructuredFileInfo {
  dub: { [key: string]: sourceFiles };
  sub: { [key: string]: sourceFiles };
  episodeInfo: string;
  dubLength: number;
  subLength: number;
}
