<?php


namespace App\Controller\Api;


use App\Entity\User;
use App\Services\FileUploader;
use App\Repository\UserRepository;
use App\Repository\GenreRepository;
use App\Repository\CharacterRepository;
use App\Repository\UniverseRepository;
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
    public function newRessource(Request $request, GenreRepository $genreRepository, CharacterRepository $characterRepository, UniverseRepository $universeRepository)
    {
        /** @var UploadedFile $file */
        $file = $request->files->get("file");
        $genreId = $request->request->get("genre");
        $persoId = $request->request->get("perso");
        $universeId = $request->request->get("universe");
        $genre = $genreRepository->find(["id" => $genreId]);
        $perso = $characterRepository->find(["id" => $persoId]);
        $type = $request->request->get("type");
        $universe = $universeRepository->find(["id" => $universeId]);

        // Compute unique file name
        $date = new DateTime();
        if($type === "Background"){
            $filename = $date->format('Y-m-d_H-i-s') . "_" . $genre->getName() . "_" . uniqid() . ".png";
        }
        else{
            $filename = $date->format('Y-m-d_H-i-s') . "_" . $perso->getName() . "_" . uniqid() . ".png";
        }
        
        // Retrieve file attributes before moving the file
        $attachmentPath  = '/app/public/images/characters';
        $filePath = $attachmentPath . DIRECTORY_SEPARATOR . $filename;


        // Move to upload directory
        $this->uploader->setTargetDirectory($attachmentPath);
        $this->uploader->upload($file, $filename);

        $ressource = new SubmitRessources();
        $ressource->setCreatedAt($date);
        $ressource->setFilename($filename);
        $ressource->setFilePath($filePath);
        $ressource->setType($type);
        $ressource->setGenre($genre);
        $ressource->setPerso($perso);
        $ressource->setUniverse($universe);
        
        // Persist
        $em = $this->getDoctrine()->getManager();
        $em->persist($ressource);
        $em->flush();

        return new Response("ok");
    }
}
