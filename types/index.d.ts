export {};

declare global {
  interface BookOverviewProps {
    id: number;
    title: string;
    author: string;
    genre: string;
    rating: number;
    total_copies: number;
    available_copies: number;
    description: string;
    color: string;
    cover: string;
    video: string;
    summary: string;
    isLoaned?: boolean;
  }

  interface BookCoverProps {
    variant?: BookCoverVariant;
    className?: string;
    coverColor: string;
    coverImage: string;
  }

  type BookCoverVariant =
    | "extraSmall"
    | "small"
    | "regular"
    | "medium"
    | "wide";

  interface BookListProps {
    title: string;
    books: BookOverviewProps[];
    containerClassName?: string;
  }

  interface AuthCredentials {
    fullName: string;
    email: string;
    password: string;
    universityId: number;
    universityCard: string;
  }
}
