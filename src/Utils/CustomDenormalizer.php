<?php


namespace App\Utils;


use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareDenormalizerInterface;

class CustomDenormalizer implements ContextAwareDenormalizerInterface
{
    /**
     * Entity manager
     * @var EntityManagerInterface
     */
    protected $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * We support denormalization if:
     *   - The type is part of the App\Entity namespace
     *   - The data is an int (as it must represent a database id)
     *
     * @inheritDoc
     */
    public function supportsDenormalization($data, string $type, string $format = null, array $context = [])
    {
        return strpos($type, 'App\\Entity\\') === 0 && is_numeric($data);
    }

    /**
     * Get the object from the database
     *
     * @inheritDoc
     */
    public function denormalize($data, string $type, string $format = null, array $context = [])
    {
        return $this->em->find($type, $data);
    }
}