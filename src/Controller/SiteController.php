<?php
/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Yaml\Yaml;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * Class SiteController
 * @package App\Controller
 */
class SiteController extends AbstractController
{
    /**
     * @Route("/{_locale}", name="site_index", requirements={"_locale"="en|fr|es"})
     * @Template()
     *
     * @param KernelInterface     $kernel
     * @param Request             $request
     * @param TranslatorInterface $translator
     * @return array
     */
    public function index( KernelInterface $kernel,
                           Request $request,
                           TranslatorInterface $translator )
    {
        return [
            'meta' => [
                'description' => $translator->trans( 'site.description' ),
                'title'       => $translator->trans( 'site.title' ),
                'keywords'    => implode( ',', $this->fetchKeywords( $kernel, $request->getLocale() ) )
            ]
        ];
    }

    /**
     * @param KernelInterface $kernel
     * @param string          $locale
     * @return array
     */
    private function fetchKeywords( KernelInterface $kernel, string $locale ): array
    {
        $keywords = [];

        $file = implode( DIRECTORY_SEPARATOR, [
            $kernel->getProjectDir(),
            'translations',
            'messages.' . $locale . '.yaml'
        ] );

        if ( is_file( $file ) ) {
            $contents = file_get_contents( $file );
            $contents = Yaml::parse( $contents );
            $keywords = $contents[ 'words' ];
        }

        return $keywords;
    }

    /**
     * @Route("/", name="site_index_base")
     * @param Request $request
     * @return RedirectResponse
     */
    public function indexRedirect( Request $request )
    {
        return $this->redirectToRoute( 'site_index', [ '_locale' => $request->getLocale() ?? 'en' ] );
    }

    /**
     * @Route("/translations.json", name="site_translations", options={"expose"=true})
     * @param KernelInterface $kernel
     */
    public function getTranslations( KernelInterface $kernel )
    {
        $translations = [
            'defaultLocale' => 'en',
            'translations'  => []
        ];

        foreach ( [ 'en', 'fr', 'es' ] as $which ) {
            $file = implode( DIRECTORY_SEPARATOR, [
                $kernel->getProjectDir(),
                'translations',
                'messages.' . $which . '.yaml'
            ] );

            if ( is_file( $file ) ) {
                $contents                                               = file_get_contents( $file );
                $trans                                                  = Yaml::parse( $contents );
                $translations[ 'translations' ][ $which ][ 'messages' ] = $this->buildDotNotation( NULL, $trans );
            }
        }

        return new JsonResponse( $translations, 200 );
    }

    protected function buildDotNotation( string $base = NULL, array $array )
    {
        $result = [];

        foreach ( $array as $key => $val ) {
            if ( is_array( $val ) ) {
                $result = array_merge( $result, $this->buildDotNotation( ( $base !== NULL ? $base . '.' : '' ) . $key, $val ) );
            } else {
                $result[ ( $base !== NULL ? $base . '.' : '' ) . $key ] = $val;
            }
        }

        return $result;
    }
}
