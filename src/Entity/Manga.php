<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MangaRepository")
 */
class Manga
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
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"essential"})
     */
    private $status;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * 
     * @Groups({"essential"})
     */
    private $chapters;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * 
     * @Groups({"essential"})
     */
    private $volumes;

    /**
     * @ORM\Column(type="text")
     * 
     * @Groups({"essential"})
     */
    private $summary;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"essential"})
     */
    private $language;

    /**
     * @ORM\Column(type="array", nullable=true)
     * 
     * @Groups({"essential"})
     */
    private $characters = [];

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"essential"})
     */
    private $file;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"essential"})
     */
    private $filepath;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="mangas")
     * @ORM\JoinColumn(nullable=false)
     * 
     * @Groups({"essential"})
     */
    private $author;

    /**
     * @ORM\Column(type="datetime")
     * 
     * @Groups({"essential"})
     */
    private $created_at;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Universe", inversedBy="mangas")
     * @ORM\JoinColumn(nullable=false)
     * 
     * @Groups({"essential"})
     */
    private $universe;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Genre", inversedBy="mangas")
     * @ORM\JoinColumn(nullable=false)
     * 
     * @Groups({"essential"})
     */
    private $genre;

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getChapters(): ?int
    {
        return $this->chapters;
    }

    public function setChapters(?int $chapters): self
    {
        $this->chapters = $chapters;

        return $this;
    }

    public function getVolumes(): ?int
    {
        return $this->volumes;
    }

    public function setVolumes(?int $volumes): self
    {
        $this->volumes = $volumes;

        return $this;
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(string $summary): self
    {
        $this->summary = $summary;

        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(string $language): self
    {
        $this->language = $language;

        return $this;
    }

    public function getCharacters(): ?array
    {
        return $this->characters;
    }

    public function setCharacters(?array $characters): self
    {
        $this->characters = $characters;

        return $this;
    }

    public function getFile(): ?string
    {
        return $this->file;
    }

    public function setFile(string $file): self
    {
        $this->file = $file;

        return $this;
    }

    public function getFilepath(): ?string
    {
        return $this->filepath;
    }

    public function setFilepath(string $filepath): self
    {
        $this->filepath = $filepath;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUniverse(): ?Universe
    {
        return $this->universe;
    }

    public function setUniverse(?Universe $universe): self
    {
        $this->universe = $universe;

        return $this;
    }

    public function getGenre(): ?Genre
    {
        return $this->genre;
    }

    public function setGenre(?Genre $genre): self
    {
        $this->genre = $genre;

        return $this;
    }
}
