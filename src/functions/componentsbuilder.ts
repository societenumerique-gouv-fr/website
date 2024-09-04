type Component = {
  __component: string;
  [key: string]: unknown;
};

type Section = {
  id: number;
  type: string;
  elements_par_ligne: 'Deux' | 'Trois';
  espacement_bas: string;
  [key: string]: unknown;
};

type BuildComponentResult = {
  type: string;
  [key: string]: unknown;
};

type BuildSectionResult = {
  rows: number;
  elements: Section[];
  sectionId: number;
  espacement_bas: string;
};

type BuildSectionsResult = [BuildSectionResult[], Section[]];

const rows: Record<'Deux' | 'Trois', number> = {
  Deux: 2,
  Trois: 3
};

export const buildComponents = (components: Component[]): BuildComponentResult[] => {
  return components.map((c) => {
    const json: BuildComponentResult = { type: c.__component.split('.')[1] };

    for (const key in c) {
      if (key !== '__component') {
        json[key] = c[key];
      }
    }

    return json;
  });
};

export const buildSections = (array: Section[]): BuildSectionsResult => {
  const resp: BuildSectionResult[] = [];
  const elementsToSplice: number[] = [];

  array.forEach((el, index) => {
    if (el.type === 'section') {
      const rowsCount = rows[el.elements_par_ligne];
      const espacement_bas = el.espacement_bas;
      const temp: Section[] = [];
      let i = index + 1;

      while (i < array.length && array[i].type !== 'fin-de-section') {
        elementsToSplice.push(i);
        temp.push(array[i]);
        i++;
      }

      resp.push({
        rows: rowsCount,
        elements: temp,
        sectionId: el.id,
        espacement_bas
      });
    }
  });

  const arrayResp = array.filter((_, i) => !elementsToSplice.includes(i));

  return [resp, arrayResp];
};
