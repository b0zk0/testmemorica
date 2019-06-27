import {ILocale} from "./ILocale";

export interface IUVData {
    annotations?: string;
    canvasIndex?: number;
    collectionIndex?: number;
    config?: any; // do not pass this on initialisation, internal use only
    configUri?: string;
    embedded?: boolean;
    iiifResourceUri?: string;
    isLightbox?: boolean;
    isReload?: boolean;
    locales?: ILocale[];
    manifestIndex?: number;
    rangeId?: string;
    root?: string;
    sequenceIndex?: number;
}