<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CharacterRepository")
 * @ORM\Table(name="characters")
 *
 */
class Character
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * 
     * @Groups({"essential"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"essential"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Universe", inversedBy="characters")
     * @ORM\JoinColumn(nullable=true)
     * 
     * @Groups({"essential"})
     */
    private $universe;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SubmitRessources", mappedBy="perso")
     */
    private $submitRessources;

    public function __construct()
    {
        $this->submitRessources = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getUniverse(): ?Universe
    {
        return $this->universe;
    }

    public function setUniverse(?Universe $universe = null): self
    {
        $this->universe = $universe;

        return $this;
    }

    /**
     * @return Collection|SubmitRessources[]
     */
    public function getSubmitRessources(): Collection
    {
        return $this->submitRessources;
    }

    public function addSubmitRessource(SubmitRessources $submitRessource): self
    {
        if (!$this->submitRessources->contains($submitRessource)) {
            $this->submitRessources[] = $submitRessource;
            $submitRessource->setPerso($this);
        }

        return $this;
    }

    public function removeSubmitRessource(SubmitRessources $submitRessource): self
    {
        if ($this->submitRessources->contains($submitRessource)) {
            $this->submitRessources->removeElement($submitRessource);
            // set the owning side to null (unless already changed)
            if ($submitRessource->getPerso() === $this) {
                $submitRessource->setPerso(null);
            }
        }

        return $this;
    }
}
