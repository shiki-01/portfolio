interface GetsType<T> {
    contents: T[];
    totalCount: number;
    offset: number;
    limit: number;
}
type DateType = {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
};
type Structure<T, P> = T extends 'get'
    ? { id: string } & DateType & Required<P>
    : T extends 'gets'
    ? GetsType<{ id: string } & DateType & Required<P>>
    : Partial<DateType> & (T extends 'patch' ? Partial<P> : P);

export type Blogs<T = 'get'> = Structure<T,
    {
        title: string;
        tags?: (
            | "お知らせ"
            | "ブログ"
            | "1 年生"
            | "2 年生"
            | "3 年生"
        )[];
        content: never;
        ogpImg: {
            url: string;
            width: number;
            height: number;
        };
    }>;


export interface EndPoints {
    get: {
        blogs: Blogs<'get'>;
    }
    gets: {
        blogs: Blogs<'gets'>;
    }
    post: {
        blogs: Blogs<'post'>;
    }
    put: {
        blogs: Blogs<'put'>;
    }
    patch: {
        blogs: Blogs<'patch'>;
    }
}
