<?php


namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\DBALException;
use Doctrine\Persistence\ObjectManager;


class SeedDatabase extends Fixture implements FixtureGroupInterface, OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        /** @var Connection $conn */
        $conn = $manager->getConnection();

        $root = __DIR__ . '/SQL/';

        try {
            $conn->prepare(file_get_contents($root . 'universes.sql'))->execute();
            $conn->prepare(file_get_contents($root . 'characters.sql'))->execute();
            $conn->prepare(file_get_contents($root . 'users.sql'))->execute();
        } catch (DBALException $e) {
            echo $e->getMessage();
        }
    }


    /**
     * @inheritDoc
     */
    public static function getGroups(): array
    {
        return ['seed'];
    }

    /**
     * @inheritDoc
     */
    public function getOrder()
    {
        return 1;
    }
}