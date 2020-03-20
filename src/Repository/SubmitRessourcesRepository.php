<?php

namespace App\Repository;

use App\Entity\SubmitRessources;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method SubmitRessources|null find($id, $lockMode = null, $lockVersion = null)
 * @method SubmitRessources|null findOneBy(array $criteria, array $orderBy = null)
 * @method SubmitRessources[]    findAll()
 * @method SubmitRessources[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SubmitRessourcesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SubmitRessources::class);
    }

    // /**
    //  * @return SubmitRessources[] Returns an array of SubmitRessources objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SubmitRessources
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
