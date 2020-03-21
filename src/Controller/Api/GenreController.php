<?php


namespace App\Controller\Api;


use App\Entity\Genre;
use App\Repository\GenreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class GenreController extends AbstractController
{
    private $genreRepository = null;
    private $serializer = null;

    /**
     * Sections constructor.
     *
     * @param GenreRepository $genreRepository
     * @param SerializerInterface $serialize
     */
    public function __construct(GenreRepository $genreRepository, SerializerInterface $serializer)
    {
        $this->genreRepository = $genreRepository;
        $this->serializer = $serializer;
    }

  
    /**
     * @Route("/genres", name="getGenres", methods={"GET"})
     *
     * @return Response
     */
    public function getGenres()
    {
        $genres = $this->genreRepository->findAll();
        $data = $this->serializer->serialize($genres, "json", ['groups' => 'essential']);
        return new Response($data);
    }

    /**
     * Retourne les informations d'un univers
     *
     * @Route("/genres/{id}", name="getGenre", methods={"GET"})
     * @param genre $genre
     *
     * @return Response
     */
    public function getGenre(genre $genre)
    {
        $data = $this->serializer->serialize($genre, "json", ['groups' => 'essential']);
        return new Response($data);
    }

    /**
     * @Route("/genres", name="newGenre", methods={"POST"})
     *
     * @param Request $request
     * @return Response
     */
    public function newGenre(Request $request)
    {
        /** @var genre $genre */
        $genre = $this->serializer->deserialize($request->getContent(), Genre::class, 'json');

        // Persist
        $em = $this->getDoctrine()->getManager();
        $em->persist($genre);
        $em->flush();

        return new Response();
    }

    // /**
    //  * @Route("/users/{id}", name="updateUser", methods={"PUT"})
    //  *
    //  * @param Request $request
    //  * @param User $user
    //  * @return Response
    //  */
    // public function updateUser(Request $request, User $user)
    // {
    //     $this->serializer->deserialize($request->getContent(), User::class, 'json', [
    //         'object_to_populate' => $user,
    //         'skip_null_values' => true,
    //     ]);

    //     // Persist
    //     $em = $this->getDoctrine()->getManager();
    //     $em->persist($user);
    //     $em->flush();

    //     return new Response();
    // }
}
