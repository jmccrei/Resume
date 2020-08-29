<?php
/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */

namespace App\Form;

use App\Entity\Contact;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class ContactType
 * @package App\Form
 */
class ContactType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm( FormBuilderInterface $builder, array $options )
    {
        $builder
            ->add( 'title', TextType::class, [
                'required' => TRUE,
                'label'    => 'words.title',
                'help'     => 'help.title',
                'attr'     => [
                    'placeholder' => 'placeholder.title',
                    'minLength'   => 10
                ]
            ] )
            ->add( 'fromEmail',
                EmailType::class, [
                    'required' => TRUE,
                    'label'    => 'words.from_email',
                    'help'     => 'help.from_email',
                    'attr'     => [
                        'placeholder' => 'placeholder.from_email'
                    ]
                ] )
            ->add( 'body', TextareaType::class, [
                'required' => TRUE,
                'label'    => 'words.body',
                'help'     => 'help.body',
                'attr'     => [
                    'placeholder' => 'placeholder.body',
                    'minLength'   => 25,
                    'rows'        => 5
                ]
            ] );
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions( OptionsResolver $resolver )
    {
        $resolver->setDefaults( [
            'data_class' => Contact::class,
        ] );
    }
}
