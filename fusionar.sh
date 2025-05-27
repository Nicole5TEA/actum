#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ Uso: ./fusionar.sh ruta/del/directorio"
  exit 1
fi

DIR="$1"
OUTPUT="proyecto_fusionado.txt"
> "$OUTPUT"

find "$DIR" -type f \
  ! -path "*/dev-dist/*" \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/.azurite/*" \
  ! -iname "*.png" \
  ! -iname "*.jpg" \
  ! -iname "*.jpeg" \
  ! -iname "*.gif" \
  ! -iname "*.svg" \
  ! -iname "*.webp" \
  ! -iname "*.ico" \
  ! -iname "*.env" \
  ! -iname "*.lock" \
  ! -name "$OUTPUT" | while read archivo; do
    num_lineas=$(wc -l < "$archivo")
    if [ "$num_lineas" -gt 1500 ]; then
      echo "↪️  Saltado (más de 1500 líneas): $archivo"
      continue
    fi

    echo -e "\n-------------------------------" >> "$OUTPUT"
    echo "// Archivo: $archivo" >> "$OUTPUT"
    echo "-------------------------------" >> "$OUTPUT"
    cat "$archivo" >> "$OUTPUT"
    echo -e "\n// Fin de: $archivo" >> "$OUTPUT"
done

echo "✅ Fusión completa en: $OUTPUT"
