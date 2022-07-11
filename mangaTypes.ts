export interface GetMangas {
    data:       Datum[];
    pagination: Pagination;
}

export interface Datum {
    mal_id:          number;
    url:             string;
    images:          { [key: string]: Image };
    approved:        boolean;
    titles:          string[];
    title:           string;
    title_english:   string;
    title_japanese:  string;
    type:            string;
    chapters:        number;
    volumes:         number;
    status:          string;
    publishing:      boolean;
    published:       Published;
    score:           number;
    scored_by:       number;
    rank:            number;
    popularity:      number;
    members:         number;
    favorites:       number;
    synopsis:        string;
    background:      string;
    authors:         Author[];
    serializations:  Author[];
    genres:          Author[];
    explicit_genres: Author[];
    themes:          Author[];
    demographics:    Author[];
}

export interface Author {
    mal_id: number;
    type:   string;
    name:   string;
    url:    string;
}

export interface Image {
    image_url:       string;
    small_image_url: string;
    large_image_url: string;
}

export interface Published {
    from: string;
    to:   string;
    prop: Prop;
}

export interface Prop {
    from:   From;
    to:     From;
    string: string;
}

export interface From {
    day:   number;
    month: number;
    year:  number;
}

export interface Pagination {
    last_visible_page: number;
    has_next_page:     boolean;
    items:             Items;
}

export interface Items {
    count:    number;
    total:    number;
    per_page: number;
}
