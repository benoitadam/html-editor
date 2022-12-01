export const trErrorPrefix = 'Error:';

export const trDicoByLocal: Record<string, Record<string, string>> = {
  'fr': {
    'invalid-email-password': 'Email ou mot de passe invalide',
    'email-already-in-use': 'Email déjà utilisé',
  }
};

export const trGetDico = (local: string) => trDicoByLocal[local] || (trDicoByLocal[local] = {});

let trDico = trGetDico('fr');
export const trLocalChange = (local: string) => trDico = trGetDico(local);

export const trAdd = (local: string, items: Record<string, string>) => {
  const trDico = trGetDico(local);
  Object.assign(trDico, items);
}

export const tr = (key: any) => {
  key = String(key);
  return trDico[key] || (trDico[key] = key);
}