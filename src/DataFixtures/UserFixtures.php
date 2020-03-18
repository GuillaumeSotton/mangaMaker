<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $yann = new User();
        $yann->setEmail("yann.prevot@gmail.com");
        $yann->setFirstName("Yann");
        $yann->setLastName("Prévot");
        $yann->setPassword($this->passwordEncoder->encodePassword($yann, 'moula'));
        $manager->persist($yann);

    
        $guillaume = new User();
        $guillaume->setEmail("guillaume.sotton@gmail.com");
        $guillaume->setFirstName("Guillaume");
        $guillaume->setLastName("Sotton");
        $guillaume->setPassword($this->passwordEncoder->encodePassword($guillaume, 'moula'));
        $manager->persist($guillaume);

        $manager->flush();
    }
}
