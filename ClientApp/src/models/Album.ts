import {ImageSnippet} from './Image'

export interface Album{
    id: number,
    name: string,
    images?: ImageSnippet[],
    description: string
}