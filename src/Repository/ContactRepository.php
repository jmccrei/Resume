<?php
/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */

namespace App\Repository;

use App\Entity\Contact;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Contact|null find( $id, $lockMode = NULL, $lockVersion = NULL )
 * @method Contact|null findOneBy( array $criteria, array $orderBy = NULL )
 * @method Contact[]    findAll()
 * @method Contact[]    findBy( array $criteria, array $orderBy = NULL, $limit = NULL, $offset = NULL )
 */
class ContactRepository extends ServiceEntityRepository
{
    /**
     * ContactRepository constructor.
     * @param ManagerRegistry $registry
     */
    public function __construct( ManagerRegistry $registry )
    {
        parent::__construct( $registry, Contact::class );
    }

    /**
     * Get contacts that were sent prior to the given date
     *
     * @param DateTime $dateTime
     * @return int|mixed|string
     */
    public function getContactsOlderThan( DateTime $dateTime )
    {
        return $this->createQueryBuilder( 'c' )
            ->where( 'c.sentAt < :dateTime' )
            ->setParameter( 'dateTime', $dateTime )
            ->getQuery()
            ->getResult();
    }
}
