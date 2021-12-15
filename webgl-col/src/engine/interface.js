/*
 * @Author: your name
 * @Date: 2021-08-26 16:48:39
 * @LastEditTime: 2021-08-27 12:02:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webgl-col/src/engine/interface.js
 */
/*
 * If you're wondering why the code doesn't just iterate
 * over all extensions using `gl.getExtensions` is that it's possible
 * some future extension is incompatible with this code. Rather than
 * have thing suddenly break it seems better to manually add to this
 * list.
 *
 */
export const supportedExtensions = [
    'ANGLE_instanced_arrays',
    'EXT_blend_minmax',
    'EXT_color_buffer_float',
    'EXT_color_buffer_half_float',
    'EXT_disjoint_timer_query',
    'EXT_disjoint_timer_query_webgl2',
    'EXT_frag_depth',
    'EXT_sRGB',
    'EXT_shader_texture_lod',
    'EXT_texture_filter_anisotropic',
    'OES_element_index_uint',
    'OES_standard_derivatives',
    'OES_texture_float',
    'OES_texture_float_linear',
    'OES_texture_half_float',
    'OES_texture_half_float_linear',
    'OES_vertex_array_object',
    'WEBGL_color_buffer_float',
    'WEBGL_compressed_texture_atc',
    'WEBGL_compressed_texture_etc1',
    'WEBGL_compressed_texture_pvrtc',
    'WEBGL_compressed_texture_s3tc',
    'WEBGL_compressed_texture_s3tc_srgb',
    'WEBGL_depth_texture',
    'WEBGL_draw_buffers',
  ];

  // make sure we dont see a global gl 

  export const defaults = {
      exitsAddExtensionsToContextFunc: true
  }

 
  