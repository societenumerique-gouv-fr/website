'use client';

type Rows = {
  [key: string]: number;
};

type Component = {
  __component: string;
  [key: string]: string | number | boolean | undefined;
};

type SectionElement = {
  type: string;
  id?: string;
  elements_par_ligne?: string;
  espacement_bas?: string | number;
  [key: string]: string | number | boolean | undefined;
};

type Section = {
  rows: number;
  elements: SectionElement[];
  sectionId: string;
  espacement_bas?: string | number;
};

const rows: Rows = {
  Deux: 2,
  Trois: 3
};

export const buildComponents = (components: Component[]): SectionElement[] => {
  return components.map((c) => {
    const { __component, ...rest } = c;
    return {
      type: __component.split('.')[1],
      ...rest
    };
  });
};

export const buildSections = (array: SectionElement[]): [Section[], SectionElement[]] => {
  const resp: Section[] = [];
  const elementsToSplice: number[] = [];

  array.forEach((el, index) => {
    if (el.type === 'section') {
      const rowsCount = rows[el.elements_par_ligne ?? ''] || 1; // Default to 1 if not found
      const espacement_bas = el.espacement_bas ?? '';
      const temp: SectionElement[] = [];
      let i = index + 1;

      while (i < array.length && array[i].type !== 'fin-de-section') {
        elementsToSplice.push(i);
        temp.push(array[i]);
        i++;
      }

      resp.push({
        rows: rowsCount,
        elements: temp,
        sectionId: el.id ?? '',
        espacement_bas
      });
    }
  });

  const arrayResp: SectionElement[] = array.filter((_, i) => !elementsToSplice.includes(i));

  return [resp, arrayResp];
};
