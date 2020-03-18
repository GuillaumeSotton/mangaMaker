<?php


namespace App\Controller\Api;


use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    private $userRepository = null;
    private $passwordEncoder = null;

    private $serializer = null;

    /**
     * Sections constructor.
     *
     * @param UserRepository $userRepository
     * @param SerializerInterface $serializer
     * @param UserPasswordEncoderInterface $passwordEncoder
     */
    public function __construct(UserRepository $userRepository, SerializerInterface $serializer, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->userRepository = $userRepository;
        $this->serializer = $serializer;
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @Route("/me", name="getMe", methods={"GET"})
     *
     * @return Response
     */
    public function getMe(): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $data = $this->serializer->serialize($user, "json", ['groups' => 'essential']);
        return new Response($data);
    }

    /**
     * @Route("/users", name="users", methods={"GET"})
     *
     * @return Response
     */
    public function users()
    {
        $users = $this->userRepository->findAll();
        $data = $this->serializer->serialize($users, "json", ['groups' => 'essential']);
        return new Response($data);
    }

    /**
     * Retourne les informations d'un utilisateur
     *
     * @Route("/users/{id}", name="getUser", methods={"GET"})
     * @param User $user
     *
     * @return Response
     */
    public function getUserById(User $user)
    {
        $data = $this->serializer->serialize($user, "json", ['groups' => 'essential']);
        return new Response($data);
    }

    /**
     * @Route("/users", name="newUser", methods={"POST"})
     *
     * @param Request $request
     * @return Response
     */
    public function newUser(Request $request)
    {
        /** @var User $user */
        $user = $this->serializer->deserialize($request->getContent(), User::class, 'json');

        // Encode password
        $user->setPassword($this->passwordEncoder->encodePassword($user, $user->getPassword()));

        // Persist
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return new Response();
    }

    /**
     * @Route("/users/{id}", name="updateUser", methods={"PUT"})
     *
     * @param Request $request
     * @param User $user
     * @return Response
     */
    public function updateUser(Request $request, User $user)
    {
        $this->serializer->deserialize($request->getContent(), User::class, 'json', [
            'object_to_populate' => $user,
            'skip_null_values' => true,
        ]);

        // Persist
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return new Response();
    }
}
