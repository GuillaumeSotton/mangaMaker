<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use RuntimeException;


class AppController extends AbstractController
{


    private $serializer = null;


    /**
     * @param SerializerInterface $serializer
     */
    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @Route("dashboard/{url}", name="dashboard", defaults={"url": null}, requirements={"url"=".+"})
     * @param UserRepository $userRepository
     *
     * @return Response
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function index(UserRepository $userRepository)
    {

        $dsn = '';

        try {

            // Send the API Token
            /** @var User $user */
            $user = $this->getUser();
            if ($user->getApiTokenExpireAt() < time()) {
                $userRepository->regenerateApiToken($user);
            }

            $apiToken = $user->getApiToken();

            $response = $this->render('app/index.html.twig', [
                'dsn' => $dsn,
                'api' => ['token' => $apiToken, "path" => "/api/v1"],
            ]);

            return $response;

        } catch (RuntimeException $e) {
            return $this->render(null, [
                'error' => "L'application React n'est pas trouvée !<br> $e",
            ]);
        }
    }

//    /**
//     * @Route("/", name="home")
//     *
//     * @return Response
//     */
//    public function home()
//    {
//        //dump($this->serializer->serialize($this->siteRepository->findAll(), "json"));
//
//        return new Response('<html><body>Bienvenue sur la homepage</body></html>');
//    }
}

