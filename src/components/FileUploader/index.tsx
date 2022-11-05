import {
  AspectRatio,
  Box,
  BoxProps,
  forwardRef,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useContext, useMemo, useState } from "react";

const first = {
  rest: {
    rotate: "-15deg",
    scale: 0.95,
    x: "-50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: "-70%",
    scale: 1.1,
    rotate: "-20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const second = {
  rest: {
    rotate: "15deg",
    scale: 0.95,
    x: "50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: "70%",
    scale: 1.1,
    rotate: "20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const third = {
  rest: {
    scale: 1.1,
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    scale: 1.3,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
  return (
    <Box
      bg="white"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      {...props}
      ref={ref}
    />
  );
});

const FileUploader = () => {
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();

  const { setFile, fileUrl } = useFileUploader();

  return (
    <AspectRatio width="64" ratio={1}>
      <Box
        borderColor="gray.300"
        borderStyle="dashed"
        borderWidth="2px"
        rounded="md"
        shadow="sm"
        role="group"
        transition="all 150ms ease-in-out"
        _hover={{
          shadow: "md",
        }}
        as={motion.div}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <Box position="relative" height="100%" width="100%">
          <Box
            position="absolute"
            top="0"
            left="0"
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
          >
            <Stack
              height="100%"
              width="100%"
              display="flex"
              alignItems="center"
              justify="center"
              spacing="4"
            >
              {!fileUrl && (
                <>
                  <Box height="16" width="12" position="relative">
                    <PreviewImage
                      variants={first}
                      backgroundImage="url('/excited-ape/2.jpeg')"
                    />
                    <PreviewImage
                      variants={second}
                      backgroundImage="url('/excited-ape/3.jpeg')"
                    />

                    <PreviewImage
                      variants={third}
                      backgroundImage={`url("/excited-ape/1.jpeg")`}
                    />
                  </Box>
                  <Stack p="8" textAlign="center" spacing="1">
                    <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                      Drop images
                    </Heading>
                    <Text fontWeight="light">or click to upload</Text>
                  </Stack>
                </>
              )}
            </Stack>
          </Box>
          {fileUrl && (
            <img src={fileUrl} style={{ height: "100%", width: "100%" }} />
          )}
          <Input
            type="file"
            height="100%"
            width="100%"
            position="absolute"
            multiple={false}
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            accept="image/*"
            onDragEnter={startAnimation}
            onDragLeave={stopAnimation}
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
          />
        </Box>
      </Box>
    </AspectRatio>
  );
};

interface FileUploaderContextType {
  setFile: (_file: File | undefined) => void;
  file: File | undefined;
  fileUrl: string | undefined;
}

interface FileUploaderProviderProps {
  children: React.ReactNode;
}

const FileUploaderContext = React.createContext<FileUploaderContextType>(
  {} as FileUploaderContextType
);

export const FileUploaderProvider: React.FC<FileUploaderProviderProps> = ({
  children,
}) => {
  const [file, setFile] = useState<File | undefined>();

  const fileUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : undefined),
    [file]
  );

  return (
    <FileUploaderContext.Provider
      value={{
        file,
        setFile,
        fileUrl,
      }}
    >
      {children}
    </FileUploaderContext.Provider>
  );
};

export const useFileUploader = (): FileUploaderContextType =>
  useContext(FileUploaderContext);

export default FileUploader;
