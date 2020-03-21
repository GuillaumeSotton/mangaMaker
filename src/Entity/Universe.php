<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UniverseRepository")
 * @ORM\Table(name="universes")
 */
class Universe
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
     * @ORM\OneToMany(targetEntity="App\Entity\Character", mappedBy="universe")
     */
    private $characters;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SubmitRessources", mappedBy="universe")
     */
    private $submitRessources;

    public function __construct()
    {
        $this->characters = new ArrayCollection();
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

    /**
     * @return Collection|Character[]
     */
    public function getCharacters(): Collection
    {
        return $this->characters;
    }

    public function addCharacter(Character $character): self
    {
        if (!$this->characters->contains($character)) {
            $this->characters[] = $character;
            $character->setUniverse($this);
        }

        return $this;
    }

    public function removeCharacter(Character $character): self
    {
        if ($this->characters->contains($character)) {
            $this->characters->removeElement($character);
            // set the owning side to null (unless already changed)
            if ($character->getUniverse() === $this) {
                $character->setUniverse(null);
            }
        }

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
            $submitRessource->setUniverse($this);
        }

        return $this;
    }

    public function removeSubmitRessource(SubmitRessources $submitRessource): self
    {
        if ($this->submitRessources->contains($submitRessource)) {
            $this->submitRessources->removeElement($submitRessource);
            // set the owning side to null (unless already changed)
            if ($submitRessource->getUniverse() === $this) {
                $submitRessource->setUniverse(null);
            }
        }

        return $this;
    }
}
