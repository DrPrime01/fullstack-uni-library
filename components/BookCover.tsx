"use client";
import { cn } from "@/lib/utils";
import BookCoverSvg from "./BookCoverSvg";
import { IKImage } from "imagekitio-next";
import { config } from "@/lib/config";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

export default function BookCover(props: BookCoverProps) {
  const {
    variant = "regular",
    className,
    coverColor = "#012B48",
    coverImage = "https://placehold.co/400x600.png",
  } = props;
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <IKImage
          path={coverImage}
          urlEndpoint={config.env.imageKit.urlEndpoint}
          alt="book cover"
          fill
          className="rounded object-fill"
          loading="lazy"
          lqip={{ active: true }}
        />
      </div>
    </div>
  );
}
