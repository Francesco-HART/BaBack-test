## Interview

### Setup
```bash
cd frontend
npm i
npm run dev

cd ../backend-express
npm i
npm run dev
# ou 
npm run test
```

### Objectif

On cherche à calculer le prix d'un panier lors d'une commande en ligne. La commande contient un panier avec des articles, et un ou plusieurs codes promo.  
**On veut donc créer la fonction permettant de déterminer le prix final du panier sur lequel est appliqué un ou plusieurs codes promo.**

Les codes promo peuvent être de plusieurs types :
- Une réduction en pourcentage (-10% sur la commande)
- Une réduction fixe (30€ d'offert)
- Un produit acheté, un produit offert (s'applique sur un produit particulier)

Ils peuvent aussi avoir des conditions d'applications :
- Réduction uniquement sur un ou plusieurs articles
- Réduction si la commande dépasse x€

**TLDR**:
- Calculer le montant final du panier après l'application des coupons dans le back
- Utiliser l'API dans le front
# BaBack-test
