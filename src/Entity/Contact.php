<?php
/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */

namespace App\Entity;

use App\Repository\ContactRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ContactRepository::class)
 */
class Contact
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $fromEmail;

    /**
     * @ORM\Column(type="text")
     */
    private $body;

    /**
     * @ORM\Column(type="datetime")
     */
    private $sentAt;

    /**
     * Contact constructor.
     */
    public function __construct()
    {
        $this->sentAt = new DateTime();
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string|null $title
     * @return $this
     */
    public function setTitle( ?string $title ): Contact
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getFromEmail(): ?string
    {
        return $this->fromEmail;
    }

    /**
     * @param string $fromEmail
     * @return $this
     */
    public function setFromEmail( string $fromEmail ): Contact
    {
        $this->fromEmail = $fromEmail;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getBody(): ?string
    {
        return $this->body;
    }

    /**
     * @param string $body
     * @return $this
     */
    public function setBody( string $body ): Contact
    {
        $this->body = $body;

        return $this;
    }

    /**
     * @return DateTimeInterface|null
     */
    public function getSentAt(): ?DateTimeInterface
    {
        return $this->sentAt;
    }

    /**
     * @param DateTimeInterface $sentAt
     * @return $this
     */
    public function setSentAt( DateTimeInterface $sentAt ): Contact
    {
        $this->sentAt = $sentAt;

        return $this;
    }
}
