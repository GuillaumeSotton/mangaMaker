<?php


namespace App\Controller\Api;


use App\Entity\User;
use App\Services\FileUploader;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Datetime;
use App\Entity\SubmitRessources;

class SubmitRessourcesController extends AbstractController
{
    private $serializer = null;
    private $uploader = null;

    /**
     * Sections constructor.
     * @param FileUploader $uploader
     * @param SerializerInterface $serializer
     */
    public function __construct(FileUploader $uploader, SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
        $this->uploader = $uploader;
    }
  
    /**
     * @Route("/submit/ressources", name="newRessource", methods={"POST"})
     *
     * @param Request $request
     * @return Response
     */
    public function newRessource(Request $request)
    {
        /** @var UploadedFile $file */
        $file = $request->files->get("file");

        // Create new attachment
        /** @var User $user */
        $user = $this->getUser();
        
        //Date of upload
        $date = new DateTime();
        
        // Retrieve file attributes before moving the file
        $attachmentPath  = './images/characters';
        $filePath = $attachmentPath . DIRECTORY_SEPARATOR . "yann.png";

        // Move to upload directory
        $this->uploader->setTargetDirectory($attachmentPath);
        $this->uploader->upload($file, "yann.png");

        $ressource = new SubmitRessources();
        $ressource->setCreatedAt($date);
        $ressource->setFilename("yann.png");
        $ressource->setFilePath($filePath);
        
        // Persist
        $em = $this->getDoctrine()->getManager();
        $em->persist($ressource);
        $em->flush();

        return new Response("ok");
    }
}
