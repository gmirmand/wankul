<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class GeneratorController extends Controller
{
    /**
     * @Route("/generator/{uniqId}")
     */
    public function indexAction($uniqId)
    {
        return $this->render('pages/generator.html.twig', array('uniqId' => $uniqId));
    }
}
