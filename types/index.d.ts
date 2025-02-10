export {};

declare global {
  interface BookOverviewProps {
    id: string;
    title: string;
    author: string;
    genre: string;
    rating: number;
    totalCopies: number;
    availableCopies: number;
    description: string;
    coverColor: string;
    videoUrl: string;
    coverUrl: string;
    summary: string;
    createdAt: Date | null;
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

  interface BookParams {
    title: string;
    author: string;
    genre: string;
    rating: number;
    coverUrl: string;
    coverColor: string;
    description: string;
    totalCopies: number;
    videoUrl: string;
    summary: string;
  }

  interface BorrowBookParams {
    bookId: string;
    userId: string;
  }
}
