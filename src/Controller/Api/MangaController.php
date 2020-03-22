<?php


namespace App\Controller\Api;


use App\Entity\User;
use App\Entity\Manga;
use App\Repository\MangaRepository;
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
use App\Entity\Submitmangas;

class MangaController extends AbstractController
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
     * @Route("/mangas", name="getMangas", methods={"GET"})
     *
     * @param MangaRepository $mangaRepository
     * @return Response
     */
    public function getMangas(MangaRepository $mangaRepository)
    {
        $mangas = $mangaRepository->findAll();
        $data = $this->serializer->serialize($mangas, "json", ['groups' => 'essential']);
        return new Response($data);
    }
  
    /**
     * @Route("/new-manga", name="newManga", methods={"POST"})
     *
     * @param Request $request
     * @return Response
     */
    public function newManga(Request $request, GenreRepository $genreRepository, CharacterRepository $characterRepository, UniverseRepository $universeRepository)
    {
        /** @var UploadedFile $file */
        $file = $request->files->get("file");
        $chapters = $request->request->get("chapters");
        $characters = $request->request->get("characters");
        $language = $request->request->get("language");
        $name = $request->request->get("name");
        $status = $request->request->get("status");
        $summary = $request->request->get("summary");
        $volumes = $request->request->get("volumes");
        $user = $this->getUser();

        // Compute unique file name
        $date = new DateTime();
        $filename = $date->format('Y-m-d_H-i-s') . "_" . $name . "_" . uniqid() . ".png";
        
        // Retrieve file attributes before moving the file
        $attachmentPath  = '/app/public/images/mangas';
        $filePath = $attachmentPath . DIRECTORY_SEPARATOR . $filename;

        // Move to upload directory
        $this->uploader->setTargetDirectory($attachmentPath);
        $this->uploader->upload($file, $filename);

        $manga = new Manga();
        $manga->setCreatedAt($date);
        $manga->setCharacters(explode(",",$characters));
        $manga->setAuthor($user);
        $manga->setFile($filename);
        $manga->setFilePath($filePath);
        $manga->setChapters($chapters);
        $manga->setLanguage($language);
        $manga->setName($name);
        $manga->setSummary($summary);
        $manga->setVolumes($volumes);
        $manga->setStatus($status);
        
        // Persist
        $em = $this->getDoctrine()->getManager();
        $em->persist($manga);
        $em->flush();

        return new Response("ok");
    }
}
