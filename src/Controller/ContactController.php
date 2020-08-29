<?php
/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use App\Manager\ContactManager;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ContactController
 * @package App\Controller
 * @Route("/{_locale}/contact", requirements={"_locale"="en|fr|es"}, options={"expose"=true})
 */
class ContactController extends AbstractController
{
    /**
     * @Route("/send", methods={"post"}, name="contact_send")
     * @param Request             $request
     * @param ContactManager      $contactManager
     * @param SerializerInterface $serializer
     * @return JsonResponse
     * @throws TransportExceptionInterface
     */
    public function send( Request $request, ContactManager $contactManager, SerializerInterface $serializer ): JsonResponse
    {
        $contact = new Contact();
        $form    = $this->createForm( ContactType::class, $contact );

        try {
            $submittedData = json_decode( $request->getContent(), TRUE );
            $form->submit( $submittedData[ 'contact' ] );
        } catch ( \Exception $e ) {
            // do nothing
        }

        if ( $form->isSubmitted() && $form->isValid() ) {
            $contactManager->sendContact( $contact );
            $this->getDoctrine()->getManager()->persist( $contact );
            $this->getDoctrine()->getManager()->flush();

            return new JsonResponse( [
                'title'     => $contact->getTitle(),
                'fromEmail' => $contact->getFromEmail(),
                'body'      => $contact->getBody()
            ], 201 );
        }

        $formJson  = $serializer->serialize( $form->createView(), 'json' );
        $formArray = json_decode( $formJson, TRUE );

        return new JsonResponse( $formArray[ 'children' ], 400 );
    }

    /**
     * @Route("/form", name="contact_form")
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function form( SerializerInterface $serializer ): JsonResponse
    {
        $contact        = new Contact();
        $form           = $this->createForm( ContactType::class, $contact );
        $serializedForm = $serializer->serialize( $form->createView(), 'json' );
        $formArray      = json_decode( $serializedForm, TRUE );

        return new JsonResponse( $formArray[ 'children' ], 200 );
    }
}
