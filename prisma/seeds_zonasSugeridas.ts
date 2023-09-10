import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {

  async function createZona(nombre: string, coordenadas: { coord1: number, coord2: number }[]) {
    const existingZona = await prisma.zona.findUnique({
      where: {
        nombre: nombre,
      }
    });

    if (!existingZona) {
      await prisma.zona.create({
        data: {
          nombre: nombre,
          coordenadas: {
            create: coordenadas,
          }
        }
      });
    }
  }

  await createZona("Victoria, Entre Ríos", [
    { coord1: -32.60742, coord2: -60.11144 },{ coord1: -32.59187, coord2: -60.15847 },
    { coord1: -32.58359, coord2: -60.1801 },{ coord1: -32.60062, coord2: -60.19555 },
    { coord1: -32.61552, coord2: -60.1753 },{ coord1: -32.60699, coord2: -60.15933 },
    { coord1: -32.60319, coord2: -60.14903 },{ coord1: -32.61472, coord2: -60.13822 },
    
]);

await createZona("Colón, Entre Ríos", [
    { coord1: -32.22558, coord2: -58.16909 },{ coord1: -32.22336, coord2: -58.16677 },
    { coord1: -32.20503, coord2: -58.14849 },{ coord1: -32.18262, coord2: -58.16789 },
    { coord1: -32.19755, coord2: -58.19312 },{ coord1: -32.24489, coord2: -58.19673 },
    { coord1: -32.25142, coord2: -58.19707 },{ coord1: -32.28419, coord2: -58.16566 },
    { coord1: -32.2663, coord2: -58.11691 },{ coord1: -32.23162, coord2: -58.12643 },
    { coord1: -32.24209, coord2: -58.1521 }
]);

await createZona("Tandil, Buenos Aires", [
    { coord1: -37.24823, coord2: -59.17331 },{ coord1: -37.24478, coord2: -59.18902 },
    { coord1: -37.24297, coord2: -59.20283 },{ coord1: -37.24116, coord2: -59.22309 },
    { coord1: -37.2552, coord2: -59.24833 },{ coord1: -37.29973, coord2: -59.25193 },
    { coord1: -37.30587, coord2: -59.25227 },{ coord1: -37.35197, coord2: -59.25227 },
    { coord1: -37.39559, coord2: -59.13949 },{ coord1: -37.35359, coord2: -59.00946 },
    { coord1: -37.2624, coord2: -59.0274 }
]);

await createZona("Balcarce, Buenos Aires", [
    { coord1: -37.78414, coord2: -58.2944 },{ coord1: -37.78072, coord2: -58.31011 },
    { coord1: -37.77892, coord2: -58.32393 },{ coord1: -37.77712, coord2: -58.34418 },
    { coord1: -37.79106, coord2: -58.36942 },{ coord1: -37.83527, coord2: -58.37302 },
    { coord1: -37.84137, coord2: -58.37337 },{ coord1: -37.88715, coord2: -58.37337 },
    { coord1: -37.93045, coord2: -58.26059 },{ coord1: -37.88875, coord2: -58.13055 },
    { coord1: -37.79822, coord2: -58.14849 }
]);

await createZona("Necochea, Buenos Aires", [
    { coord1: -38.49632, coord2: -58.74725 },{ coord1: -38.51227, coord2: -58.80312 },
    { coord1: -38.52822, coord2: -58.84406 },{ coord1: -38.53611, coord2: -58.86398 },
    { coord1: -38.54145, coord2: -58.87771 },{ coord1: -38.54387, coord2: -58.88801 },
    { coord1: -38.54534, coord2: -58.89281 },{ coord1: -38.56088, coord2: -58.89711 },
    { coord1: -38.60379, coord2: -58.78432 },{ coord1: -38.56248, coord2: -58.65429 },
    { coord1: -38.49629, coord2: -58.69798 }
]);

await createZona("Chivilcoy, Buenos Aires", [
    { coord1: -34.83945, coord2: -59.99419 },{ coord1: -34.82236, coord2: -60.06895 },
    { coord1: -34.83966, coord2: -60.12466 },{ coord1: -34.87329, coord2: -60.15144 },
    { coord1: -34.88734, coord2: -60.15453 },{ coord1: -34.89607, coord2: -60.15315 },
    { coord1: -34.90212, coord2: -60.15006 },{ coord1: -34.90715, coord2: -60.14405 },
    { coord1: -35.00588, coord2: -60.01548 },{ coord1: -34.90882, coord2: -59.90124 },
    { coord1: -34.83941, coord2: -59.94493 }
]);

await createZona("Luján, Buenos Aires", [
    { coord1: -34.51193, coord2: -59.0892 },{ coord1: -34.49478, coord2: -59.16395 },
    { coord1: -34.52756, coord2: -59.19923 },{ coord1: -34.55948, coord2: -59.22446 },
    { coord1: -34.57542, coord2: -59.2303 },{ coord1: -34.58602, coord2: -59.21193 },
    { coord1: -34.59181, coord2: -59.20129 },{ coord1: -34.59884, coord2: -59.18721 },
    { coord1: -34.63949, coord2: -59.10155 },{ coord1: -34.58158, coord2: -58.99624 },
    { coord1: -34.51189, coord2: -59.03993 }
]);

await createZona("Mercedes, Buenos Aires", [
    { coord1: -34.60269, coord2: -59.40814 },{ coord1: -34.5929, coord2: -59.48548 },
    { coord1: -34.62565, coord2: -59.52075 },{ coord1: -34.65753, coord2: -59.54599 },
    { coord1: -34.67345, coord2: -59.55182 },{ coord1: -34.68404, coord2: -59.53345 },
    { coord1: -34.68982, coord2: -59.52281 },{ coord1: -34.69685, coord2: -59.50874 },
    { coord1: -34.73745, coord2: -59.42308 },{ coord1: -34.67961, coord2: -59.31776 },
    { coord1: -34.61, coord2: -59.36145 }
]);

await createZona("Tafí del Valle, Tucumán", [
    { coord1: -26.80492, coord2: -65.70176 },{ coord1: -26.82658, coord2: -65.75691 },
    { coord1: -26.84762, coord2: -65.7997 },{ coord1: -26.86014, coord2: -65.81832 },
    { coord1: -26.86439, coord2: -65.83961 },{ coord1: -26.88165, coord2: -65.84544 },
    { coord1: -26.89528, coord2: -65.83841 },{ coord1: -26.90477, coord2: -65.82742 },
    { coord1: -26.91269, coord2: -65.81403 },{ coord1: -26.94695, coord2: -65.78682 },
    { coord1: -26.95107, coord2: -65.7167 },{ coord1: -26.91788, coord2: -65.66014 },
    { coord1: -26.81254, coord2: -65.67945 }
]);

await createZona("Amaicha del Valle, Tucumán", [
    { coord1: -26.57989, coord2: -65.92243 },{ coord1: -26.57734, coord2: -65.94359 },
    { coord1: -26.58783, coord2: -65.95565 },{ coord1: -26.60192, coord2: -65.95728 },
    { coord1: -26.60096, coord2: -65.96123 },{ coord1: -26.59954, coord2: -65.96552 },
    { coord1: -26.60088, coord2: -65.96638 },{ coord1: -26.60552, coord2: -65.96655 },
    { coord1: -26.61132, coord2: -65.96672 },{ coord1: -26.62173, coord2: -65.9572 },
    { coord1: -26.62294, coord2: -65.9214 },{ coord1: -26.61053, coord2: -65.89711 },
    { coord1: -26.58753, coord2: -65.89274 }
]);

await createZona("Diamante, Entre Ríos", [
    { coord1: -32.05131, coord2: -60.61846 },{ coord1: -32.05335, coord2: -60.65005 },
    { coord1: -32.0772, coord2: -60.66378 },{ coord1: -32.08811, coord2: -60.59666 },
    { coord1: -32.0588, coord2: -60.59074 },{ coord1: -32.05722, coord2: -60.60059 },
    { coord1: -32.05563, coord2: -60.60689 },{ coord1: -32.05971, coord2: -60.60695 },
    { coord1: -32.06, coord2: -60.61284 },{ coord1: -32.05954, coord2: -60.61571 },
    { coord1: -32.05762, coord2: -60.61926 }
]);

await createZona("Concordia, Entre Ríos", [
    { coord1: -31.33038, coord2: -58.08586 },{ coord1: -31.40777, coord2: -58.102 },
    { coord1: -31.41803, coord2: -58.04192 },{ coord1: -31.40023, coord2: -57.99523 },
    { coord1: -31.38288, coord2: -57.98046 },{ coord1: -31.36084, coord2: -57.99454 },
    { coord1: -31.33552, coord2: -57.98424 },{ coord1: -31.34116, coord2: -58.04054 },
    
]);

await createZona("Gualeguaychú, Entre Ríos", [
    { coord1: -32.97225, coord2: -58.58986 },{ coord1: -33.03358, coord2: -58.61836 },
    { coord1: -33.03502, coord2: -58.54935 },{ coord1: -33.01142, coord2: -58.48377 },
    { coord1: -32.98183, coord2: -58.50755 },{ coord1: -32.98331, coord2: -58.52115 },
    { coord1: -32.97729, coord2: -58.52858 }
]);

await createZona("9 de Julio, Buenos Aires", [
    { coord1: -35.41797, coord2: -60.88881 },{ coord1: -35.42639, coord2: -60.90323 },
    { coord1: -35.44306, coord2: -60.89705 },{ coord1: -35.44853, coord2: -60.90873 },
    { coord1: -35.43066, coord2: -60.92418 },{ coord1: -35.43573, coord2: -60.941 },
    { coord1: -35.50235, coord2: -60.88744 },{ coord1: -35.46663, coord2: -60.8483 },
    
]);

await createZona("La Cumbre, Córdoba", [
    { coord1: -30.95986, coord2: -64.47984 },{ coord1: -30.95866, coord2: -64.49911 },
    { coord1: -30.97378, coord2: -64.50075 },{ coord1: -30.9783, coord2: -64.52231 },
    { coord1: -30.99529, coord2: -64.51297 },{ coord1: -30.99779, coord2: -64.48048 },
    
]);

await createZona("La Falda, Córdoba", [
    { coord1: -31.07457, coord2: -64.46958 },{ coord1: -31.08736, coord2: -64.53387 },
    { coord1: -31.10735, coord2: -64.54838 },{ coord1: -31.10992, coord2: -64.48005 },
    { coord1: -31.09535, coord2: -64.46561 },{ coord1: -31.08871, coord2: -64.46138 },
    
]);

await createZona("Villa General Belgrano, Córdoba", [
    { coord1: -31.94841, coord2: -64.55185 },{ coord1: -31.96523, coord2: -64.59167 },
    { coord1: -32.00578, coord2: -64.57931 },{ coord1: -32.00611, coord2: -64.57757 },
    { coord1: -32.00627, coord2: -64.57868 },{ coord1: -32.00643, coord2: -64.57807 },
    { coord1: -32.00578, coord2: -64.54043 },{ coord1: -31.97994, coord2: -64.54391 },
    { coord1: -31.96261, coord2: -64.53022 }
]);

await createZona("Villa Carlos Paz, Córdoba", [
    { coord1: -31.3999, coord2: -64.49436 },{ coord1: -31.35857, coord2: -64.48286 },
    { coord1: -31.36297, coord2: -64.54758 },{ coord1: -31.3829, coord2: -64.52629 },
    { coord1: -31.40576, coord2: -64.52046 },{ coord1: -31.462, coord2: -64.50878 },
    { coord1: -31.43652, coord2: -64.47033 },{ coord1: -31.40774, coord2: -64.4451 },
    { coord1: -31.3763, coord2: -64.43188 }
]);

await createZona("Calamuchita, Córdoba", [
    { coord1: -31.80237, coord2: -64.28177 },{ coord1: -31.98149, coord2: -64.71598 },
    { coord1: -31.84467, coord2: -64.95245 },{ coord1: -32.57581, coord2: -64.91451 },
    { coord1: -32.61833, coord2: -64.41223 },{ coord1: -32.26644, coord2: -64.24126 },
    { coord1: -32.07951, coord2: -64.23817 }
]);

await createZona("Jesús María, Córdoba", [
    { coord1: -30.96627, coord2: -64.08239 },{ coord1: -30.95843, coord2: -64.1111 },
    { coord1: -30.97959, coord2: -64.12986 },{ coord1: -31.00542, coord2: -64.09527 },
    { coord1: -31.0124, coord2: -64.0339 },{ coord1: -30.98058, coord2: -64.01283 },
    
]);

await createZona("Colonia Caroya, Córdoba", [
    { coord1: -30.98094, coord2: -64.06557 },{ coord1: -31.01625, coord2: -64.10179 },
    { coord1: -31.02655, coord2: -64.04171 },{ coord1: -31.00875, coord2: -63.99734 },
    { coord1: -30.9883, coord2: -64.02163 }
]);

await createZona("Vera, Santa Fé", [
    { coord1: -28.0203, coord2: -60.8854 },{ coord1: -29.81188, coord2: -60.97089 },
    { coord1: -29.99804, coord2: -60.28991 },{ coord1: -29.4188, coord2: -60.11155 },
    { coord1: -28.04166, coord2: -59.99997 }
]);

await createZona("Castellanos, Santa Fé", [
    { coord1: -30.74617, coord2: -61.79917 },{ coord1: -31.74706, coord2: -62.24721 },
    { coord1: -31.69025, coord2: -61.55112 },{ coord1: -30.87738, coord2: -61.34667 },
    
]);

await createZona("General López, Santa Fé", [
    { coord1: -33.43794, coord2: -62.14799 },{ coord1: -34.39804, coord2: -62.89265 },
    { coord1: -34.3792, coord2: -61.72416 },{ coord1: -33.85358, coord2: -61.17424 },
    { coord1: -33.45083, coord2: -61.48537 }
]);

await createZona("Realicó, La Pampa", [
    { coord1: -34.99139, coord2: -64.39057 },{ coord1: -35.1201, coord2: -64.41014 },
    { coord1: -35.08794, coord2: -64.0409 },{ coord1: -34.94813, coord2: -64.04304 },
    { coord1: -34.94778, coord2: -64.04107 }
]);

await createZona("Ultracán, La Pampa", [
    { coord1: -36.87047, coord2: -66.12229 },{ coord1: -37.54259, coord2: -66.3918 },
    { coord1: -37.69725, coord2: -64.52009 },{ coord1: -37.66811, coord2: -64.13291 },
    { coord1: -37.03368, coord2: -64.24796 },{ coord1: -37.03242, coord2: -64.24904 },
    { coord1: -37.03317, coord2: -64.24706 }
]);

await createZona("Yerba Buena, Tucumán", [
    { coord1: -26.77648, coord2: -65.35085 },{ coord1: -26.82673, coord2: -65.34638 },
    { coord1: -26.8288, coord2: -65.30184 },{ coord1: -26.77893, coord2: -65.26862 },
    { coord1: -26.77675, coord2: -65.26145 },{ coord1: -26.77073, coord2: -65.2766 },
    { coord1: -26.76636, coord2: -65.29626 }
]);

await createZona("San Javier, Tucumán", [
    { coord1: -26.76606, coord2: -65.41951 },{ coord1: -26.81632, coord2: -65.41505 },
    { coord1: -26.81838, coord2: -65.3705 },{ coord1: -26.76851, coord2: -65.33728 },
    { coord1: -26.76632, coord2: -65.33012 },{ coord1: -26.76031, coord2: -65.34527 },
    { coord1: -26.75594, coord2: -65.3649 }
]);
  
}

main()
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
