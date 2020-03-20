<?php


namespace App\Services;


use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Service qui gère l'upload de fichier
 * @package App\Services
 */
class FileUploader {

    private $targetDirectory = null;
    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * FileUploader constructor.
     *
     * @param string $targetDirectory
     * @param LoggerInterface $logger
     */
    public function __construct(string $targetDirectory=null, LoggerInterface $logger)
    {
        $this->targetDirectory = $targetDirectory;
        $this->logger = $logger;
    }

    /**
     * @param UploadedFile $file
     * @param string|null $fileName
     *
     * @return string|null
     */
    public function upload(UploadedFile $file, string $fileName=null): ?string
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = normalizer_normalize($originalFilename);
        if (!$fileName)
            $fileName = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();

        try {
            $file->move($this->getTargetDirectory(), $fileName);
        } catch (FileException $e) {
            $this->logger->error($e->getMessage());
            return null;
        }

        return $fileName;
    }

    /**
     * @return string
     */
    public function getTargetDirectory()
    {
        return $this->targetDirectory;
    }

    /**
     * @param string|null $targetDirectory
     */
    public function setTargetDirectory(?string $targetDirectory): void
    {
        $this->targetDirectory = $targetDirectory;
    }

}