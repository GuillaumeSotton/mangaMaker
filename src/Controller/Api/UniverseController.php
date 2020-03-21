<?php


namespace App\Controller\Api;


use App\Entity\Universe;
use App\Repository\UniverseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UniverseController extends AbstractController
{
    private $universeRepository = null;
    private $serializer = null;

    /**
     * Sections constructor.
     *
     * @param UniverseRepository $universeRepository
     * @param SerializerInterface $serialize
     */
    public function __construct(UniverseRepository $universeRepository, SerializerInterface $serializer)
    {
        $this->universeRepository = $universeRepository;
        $this->serializer = $serializer;
    }

  
    /**
     * @Route("/universes", name="universes", methods={"GET"})
     *
     * @return Response
     */
    public function getUniverses()
    {
        $universes = $this->universeRepository->findAll();
        $data = $this->serializer->serialize($universes, "json", ['groups' => 'essential']);
        return new Response($data);
    }

    /**
     * Retourne les informations d'un univers
     *
     * @Route("/universes/{id}", name="getUniverse", methods={"GET"})
     * @param Universe $universe
     *
     * @return Response
     */
    public function getUniverse(Universe $universe)
    {
        $data = $this->serializer->serialize($universe, "json", ['groups' => 'essential']);
        return new Response($data);
    }

    /**
     * @Route("/universes", name="newUniverse", methods={"POST"})
     *
     * @param Request $request
     * @return Response
     */
    public function newUniverse(Request $request)
    {
        /** @var Universe $universe */
        $universe = $this->serializer->deserialize($request->getContent(), Universe::class, 'json');

        // Persist
        $em = $this->getDoctrine()->getManager();
        $em->persist($universe);
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
