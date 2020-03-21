<?php


namespace App\Controller\Api;


use App\Entity\Character;
use App\Repository\CharacterRepository;
use App\Repository\UniverseRepository;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CharacterController extends AbstractController
{
    private $characterRepository = null;
    private $serializer = null;

    /**
     * Sections constructor.
     *
     * @param CharacterRepository $characterRepository
     * @param SerializerInterface $serialize
     */
    public function __construct(CharacterRepository $characterRepository, SerializerInterface $serializer)
    {
        $this->characterRepository = $characterRepository;
        $this->serializer = $serializer;
    }

  
    /**
     * @Route("/characters", name="characters", methods={"GET"})
     *
     * @return Response
     */
    public function getCharacters()
    {
        $characters = $this->characterRepository->findAll();
        $data = $this->serializer->serialize($characters, "json", ['groups' => 'essential']);
        return new Response($data);
    }

    /**
     * Retourne les informations d'un univers
     *
     * @Route("/characters/{id}", name="getCharacter", methods={"GET"})
     * @param Character $character
     *
     * @return Response
     */
    public function getCharacter(Character $character)
    {
        $data = $this->serializer->serialize($character, "json", ['groups' => 'essential']);
        return new Response($data);
    }

    /**
     * @Route("/characters", name="newCharacter", methods={"POST"})
     *
     * @param Request $request
     * @return Response
     */
    public function newCharacter(Request $request, UniverseRepository $repo)
    {
        $character = $this->serializer->deserialize($request->getContent(), Character::class, 'json');

        // Persist
        $em = $this->getDoctrine()->getManager();
        $em->persist($character);
        $em->flush();

        return new Response("ok");
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
