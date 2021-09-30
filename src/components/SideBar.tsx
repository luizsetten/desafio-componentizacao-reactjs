import {useState, useEffect, memo, useCallback} from 'react';

import { Button } from './Button';

import { GenreResponseProps } from '../@types/genreResponseProps';

import { api } from '../services/api';

import '../styles/sidebar.scss';

interface SideBarProps {
  setSelectedGenreId: (id: number) => void;
  selectedGenreId: number;
}

function SideBarComponent({setSelectedGenreId, selectedGenreId}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, [])

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

  </nav>
  )
}

export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))