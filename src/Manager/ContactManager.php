<?php

/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
declare( strict_types = 1 );

namespace App\Manager;

use App\Entity\Contact;
use App\Repository\ContactRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

/**
 * Class ContactManager
 * @package App\Manager
 */
class ContactManager
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var MailerInterface
     */
    protected $mailer;

    /**
     * @var KernelInterface
     */
    protected $kernel;

    /**
     * ContactManager constructor.
     * @param EntityManagerInterface $entityManager
     * @param KernelInterface        $kernel
     * @param MailerInterface        $mailer
     */
    public function __construct( EntityManagerInterface $entityManager,
                                 KernelInterface $kernel,
                                 MailerInterface $mailer )
    {
        $this->entityManager = $entityManager;
        $this->mailer        = $mailer;
        $this->kernel        = $kernel;
        $this->cleanup();
    }

    /**
     * Cleanup the database - Removes all contacts older than 1 second
     * Removing all immediately would have been too easy
     * We do not want to keep anything
     */
    private function cleanup(): void
    {
        /** @var ContactRepository $repo */
        $repo     = $this->entityManager->getRepository( Contact::class );
        $contacts = $repo->getContactsOlderThan( ( new DateTime() )->modify( '-1 seconds' ) );

        if ( is_array( $contacts ) && count( $contacts ) > 0 ) {
            foreach ( $contacts as $contact ) {
                $this->entityManager->remove( $contact );
            }

            $this->entityManager->flush();
        }
    }

    /**
     * Send an contact
     *
     * @param Contact $contact
     * @return bool
     * @throws TransportExceptionInterface
     * @noinspection PhpParameterByRefIsNotUsedAsReferenceInspection
     */
    public function sendContact( Contact &$contact ): bool
    {
        $email = ( new Email() )
            ->to( 'josh@joshmccreight.ca' )
            ->from( $contact->getFromEmail() )
            ->replyTo( $contact->getFromEmail() )
            ->subject( $contact->getTitle() )
            ->text( htmlentities( $contact->getBody() ?? '' ) );

        $this->mailer->send( $email );

        return TRUE;
    }
}