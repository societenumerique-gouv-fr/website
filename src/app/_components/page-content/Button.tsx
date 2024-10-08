'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { marginsBottom, position } from '../structs';

type Taille = 'Petit' | 'Moyen' | 'Grand';
type PositionType = keyof typeof position;
type EspacementBasType = keyof typeof marginsBottom;

const sizes: Record<Taille, string> = {
  Petit: 'fr-btn--sm',
  Moyen: '',
  Grand: 'fr-btn--lg'
};

type ButtonData = {
  id: string;
  couleur: string;
  espacement_bas: EspacementBasType;
  page_cible: string;
  sans_contour: boolean;
  taille: Taille;
  position: PositionType;
  texte: string;
  afficher_icone: boolean;
  position_icone: string;
};

type ButtonProps = {
  data: ButtonData;
  rows: number;
};

export const Button = ({ data, rows }: ButtonProps) => {
  const [buttonData, setButtonData] = useState<ButtonData>(data);
  const [fillIcon, setFillIcon] = useState<string>('');

  useEffect(() => {
    setButtonData(data);
    setFillIcon(data.couleur === 'bleu' ? 'rgb(255,255,255,1)' : 'rgb(0, 0, 145)');
  }, [data]);

  const positionClass = position[buttonData.position] || 'center';

  return (
    <>
      {rows === 1 && (
        <div
          key={buttonData.id}
          className={`${positionClass === 'left' || positionClass === 'right' ? positionClass : 'center'}
              ${sizes[buttonData.taille]}`}
          style={{ marginBottom: marginsBottom[buttonData.espacement_bas] || undefined }} // Ensure fallback
        >
          {buttonData.page_cible && (
            <Link
              href={buttonData.page_cible}
              target={buttonData.page_cible.includes('https://') ? '_blank' : undefined}
              className={`${!buttonData.sans_contour ? (buttonData.couleur === 'bleu' ? 'fr-btn' : 'fr-btn fr-btn--secondary') : 'fr-btn fr-btn--tertiary-no-outline'} ${sizes[buttonData.taille]}`}>
              {buttonData.position_icone === 'Droite' && buttonData.texte}
              {buttonData.afficher_icone && (
                <span
                  style={{
                    width: buttonData.taille === 'Petit' ? '20px' : buttonData.taille === 'Moyen' ? '23px' : '26px',
                    transform: 'translateY(2px)'
                  }}>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      d='M3.33946 17.0002C2.90721 16.2515 2.58277 15.4702 2.36133 14.6741C3.3338 14.1779 3.99972 13.1668 3.99972 12.0002C3.99972 10.8345 3.3348 9.824 2.36353 9.32741C2.81025 7.71651 3.65857 6.21627 4.86474 4.99001C5.7807 5.58416 6.98935 5.65534 7.99972 5.072C9.01009 4.48866 9.55277 3.40635 9.4962 2.31604C11.1613 1.8846 12.8847 1.90004 14.5031 2.31862C14.4475 3.40806 14.9901 4.48912 15.9997 5.072C17.0101 5.65532 18.2187 5.58416 19.1346 4.99007C19.7133 5.57986 20.2277 6.25151 20.66 7.00021C21.0922 7.7489 21.4167 8.53025 21.6381 9.32628C20.6656 9.82247 19.9997 10.8336 19.9997 12.0002C19.9997 13.166 20.6646 14.1764 21.6359 14.673C21.1892 16.2839 20.3409 17.7841 19.1347 19.0104C18.2187 18.4163 17.0101 18.3451 15.9997 18.9284C14.9893 18.3451 14.4467 19.5113 14.5032 21.6844C12.8382 22.1158 11.1148 22.1004 9.49633 21.6818C9.55191 20.5923 9.00929 19.5113 7.99972 18.9284C6.98938 18.3451 5.78079 18.4162 4.86484 19.0103C4.28617 18.4205 3.77172 17.7489 3.33946 17.0002ZM8.99972 17.1964C10.0911 17.8265 10.8749 18.8227 11.2503 19.9659C11.7486 20.0133 12.2502 20.014 12.7486 19.9675C13.1238 18.8237 13.9078 17.8268 14.9997 17.1964C16.0916 16.5659 17.347 16.3855 18.5252 16.6324C18.8146 16.224 19.0648 15.7892 19.2729 15.334C18.4706 14.4373 17.9997 13.2604 17.9997 12.0002C17.9997 10.74 18.4706 9.5632 19.2729 8.6665C19.1688 8.4405 19.0538 8.21822 18.9279 8.00021C18.802 7.78219 18.667 7.57148 18.5233 7.36842C17.3457 7.61476 16.0911 7.43414 14.9997 6.80405C13.9083 6.17395 13.1246 5.17768 12.7491 4.03455C12.2509 3.98714 11.7492 3.98646 11.2509 4.03292C10.8756 5.17671 10.0916 6.17364 8.99972 6.80405C7.9078 7.43447 6.65245 7.61494 5.47428 7.36803C5.18485 7.77641 4.93463 8.21117 4.72656 8.66637C5.52881 9.56311 5.99972 10.74 5.99972 12.0002C5.99972 13.2604 5.52881 14.4373 4.72656 15.334C4.92861 15.7906 5.17886 16.2253 5.46824 16.6317C6.65245 16.3855 7.9078 16.5666 8.99972 17.1964Z'
                      fill={fillIcon}
                    />
                  </svg>
                </span>
              )}
              {buttonData.position_icone === 'Gauche' && buttonData.texte}
            </Link>
          )}
        </div>
      )}
    </>
  );
};
