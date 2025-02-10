"use client";
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import { config } from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Props {
  onFileChange: (filePath: string) => void;
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value?: string;
}

const ONE_MB_SIZE = 1024 * 1024;

const authenticator = async () => {
  try {
    const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Request failed with status ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function FileUpload({
  onFileChange,
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
}: Props) {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null } | null>({
    filePath: value ?? null,
  });
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === "dark" ? "bg-dark-300" : "bg-light-600",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-500",
  };

  const onError = (err: any) => {
    console.log(err);
    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again`,
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully`,
    });
  };
  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size >= 20 * ONE_MB_SIZE) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 20MB in size",
          variant: "destructive",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size >= 50 * ONE_MB_SIZE) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 50MB in size",
          variant: "destructive",
        });

        return false;
      }
    }

    return true;
  };
  return (
    <ImageKitProvider
      publicKey={config.env.imageKit.publicKey}
      urlEndpoint={config.env.imageKit.urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        validateFile={onValidate}
        useUniqueFileName
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);

          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />
      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>
      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath!}
            path={file.filePath!}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath!}
            controls
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
}
