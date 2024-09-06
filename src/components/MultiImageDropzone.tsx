"use client";
import "@/styles/image-upload.scss";
import { formatFileSize } from "@edgestore/react/utils";
import { UploadCloudIcon, X } from "lucide-react";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

export type FileState = {
  file: File | string;
  key: string;
  progress: "PENDING" | "COMPLETE" | "ERROR" | number;
};

type InputProps = {
  className?: string;
  value?: FileState[];
  onChange?: (files: FileState[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file is not supported.";
  },
};

const MultiImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, value, className, disabled, onChange, onFilesAdded },
    ref
  ) => {
    const [customError, setCustomError] = React.useState<string>();

    const imageUrls = React.useMemo(() => {
      if (value) {
        return value.map((fileState) => {
          if (typeof fileState.file === "string") {
            return fileState.file;
          } else {
            return URL.createObjectURL(fileState.file);
          }
        });
      }
      return [];
    }, [value]);

    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { "image/*": [] },
      disabled,
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles;
        setCustomError(undefined);
        if (
          dropzoneOptions?.maxFiles &&
          (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
        ) {
          setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
          return;
        }
        if (files) {
          const addedFiles = files.map<FileState>((file) => ({
            file,
            key: Math.random().toString(36).slice(2),
            progress: "PENDING",
          }));
          void onFilesAdded?.(addedFiles);
          void onChange?.([...(value ?? []), ...addedFiles]);
        }
      },
      ...dropzoneOptions,
    });

    const dropZoneClassName = React.useMemo(
      () =>
        [
          "dropzone-container",
          isFocused && "focused",
          disabled && "disabled",
          (isDragReject ?? fileRejections[0]) && "reject",
          isDragAccept && "accept",
          className,
        ]
          .filter(Boolean)
          .join(" "),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ]
    );

    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div>
        <div className="grid grid-cols-[repeat(1,1fr)] gap-2 sm:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(4,1fr)]">
          {value?.map(({ file, progress }, index) => (
            <div key={index} className={"image-container aspect-square"}>
              <img
                className="image"
                src={imageUrls[index]}
                alt={typeof file === "string" ? file : file.name}
              />
              {typeof progress === "number" && (
                <div className="progress-overlay">
                  <CircleProgress progress={progress} />
                </div>
              )}
              {imageUrls[index] && !disabled && progress === "PENDING" && (
                <div
                  className="remove-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    void onChange?.(value.filter((_, i) => i !== index) ?? []);
                  }}
                >
                  <div className="icon-container">
                    <X className="icon" />
                  </div>
                </div>
              )}
            </div>
          ))}
          {(!value || value.length < (dropzoneOptions?.maxFiles ?? 0)) && (
            <div
              {...getRootProps({
                className: dropZoneClassName,
              })}
            >
              <input ref={ref} {...getInputProps()} />
              <div className="flex flex-col items-center justify-center text-xs text-gray-400">
                <UploadCloudIcon className="mb-2 h-7 w-7" />
                <div className="text-gray-400">drag & drop to upload</div>
                <div className="mt-3">
                  <Button type="button" disabled={disabled}>
                    select
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-1 text-xs text-red-500">
          {customError ?? errorMessage}
        </div>
      </div>
    );
  }
);
MultiImageDropzone.displayName = "MultiImageDropzone";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={["custom-button", className].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { MultiImageDropzone };

function CircleProgress({ progress }: { progress: number }) {
  const strokeWidth = 10;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="circle-progress">
      <svg
        className="absolute top-0 left-0 -rotate-90 transform"
        width="100%"
        height="100%"
        viewBox={`0 0 ${(radius + strokeWidth) * 2} ${
          (radius + strokeWidth) * 2
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="text-gray-400"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
        />
        <circle
          className="text-white transition-all duration-300 ease-in-out"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={((100 - progress) / 100) * circumference}
          strokeLinecap="round"
          fill="none"
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
        />
      </svg>
      <div className="text">{Math.round(progress)}%</div>
    </div>
  );
}
