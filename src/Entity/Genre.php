<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass="App\Repository\GenreRepository")
 * @ORM\Table(name="genres")
 */
class Genre
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
     * @ORM\OneToMany(targetEntity="App\Entity\SubmitRessources", mappedBy="genre")
     */
    private $submitRessources;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Manga", mappedBy="genre")
     */
    private $mangas;

    public function __construct()
    {
        $this->submitRessources = new ArrayCollection();
        $this->mangas = new ArrayCollection();
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
            $submitRessource->setGenre($this);
        }

        return $this;
    }

    public function removeSubmitRessource(SubmitRessources $submitRessource): self
    {
        if ($this->submitRessources->contains($submitRessource)) {
            $this->submitRessources->removeElement($submitRessource);
            // set the owning side to null (unless already changed)
            if ($submitRessource->getGenre() === $this) {
                $submitRessource->setGenre(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Manga[]
     */
    public function getMangas(): Collection
    {
        return $this->mangas;
    }

    public function addManga(Manga $manga): self
    {
        if (!$this->mangas->contains($manga)) {
            $this->mangas[] = $manga;
            $manga->setGenre($this);
        }

        return $this;
    }

    public function removeManga(Manga $manga): self
    {
        if ($this->mangas->contains($manga)) {
            $this->mangas->removeElement($manga);
            // set the owning side to null (unless already changed)
            if ($manga->getGenre() === $this) {
                $manga->setGenre(null);
            }
        }

        return $this;
    }
}
